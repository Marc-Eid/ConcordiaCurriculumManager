﻿using AutoMapper;
using ConcordiaCurriculumManager.DTO.Courses;
using ConcordiaCurriculumManager.DTO.Dossiers.CourseRequests.InputDTOs;
using ConcordiaCurriculumManager.DTO.Dossiers.CourseRequests.OutputDTOs;
using ConcordiaCurriculumManager.Models.Users;
using ConcordiaCurriculumManager.Security;
using ConcordiaCurriculumManager.Services;
using ConcordiaCurriculumManager.Swagger;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Filters;
using System.ComponentModel.DataAnnotations;
using System.Net.Mime;

namespace ConcordiaCurriculumManager.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class CourseController : Controller
{
    private readonly IMapper _mapper;
    private readonly ILogger<CourseController> _logger;
    private readonly ICourseService _courseService;
    private readonly IUserAuthenticationService _userService;

    public CourseController(IMapper mapper, ILogger<CourseController> logger, ICourseService courseService, IUserAuthenticationService userService)
    {
        _mapper = mapper;
        _logger = logger;
        _courseService = courseService;
        _userService = userService;
    }

    [HttpGet(nameof(GetAllCourseSettings))]
    [SwaggerResponse(StatusCodes.Status200OK, "Course settings retrieved")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "User is not authorized")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    public async Task<ActionResult> GetAllCourseSettings()
    {

        var courseComponents = _courseService.GetAllCourseComponents();
        var courseCareers = _courseService.GetAllCourseCareers();
        var courseSubjects = await _courseService.GetAllCourseSubjects();

        var response = new CourseSettingsDTO
        {
            CourseCareers = courseCareers,
            CourseComponents = courseComponents,
            CourseSubjects = courseSubjects
        };
        return Ok(response);
    }

    [HttpPost(nameof(InitiateCourseCreation))]
    [Consumes(typeof(CourseCreationInitiationDTO), MediaTypeNames.Application.Json)]
    [Authorize(Roles = RoleNames.Initiator)]
    [SwaggerResponse(StatusCodes.Status422UnprocessableEntity, "Invalid input")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    [SwaggerResponse(StatusCodes.Status201Created, "Course creation dossier created successfully", typeof(CourseCreationRequestDTO))]
    [SwaggerRequestExample(typeof(CourseCreationInitiationDTO), typeof(CourseCreationInitiationDTOExample))]
    public async Task<ActionResult> InitiateCourseCreation([FromBody, Required] CourseCreationInitiationDTO initiation)
    {
        Guid userId = Guid.Parse(_userService.GetCurrentUserClaim(Claims.Id));
        var courseCreationRequest = await _courseService.InitiateCourseCreation(initiation, userId);
        var courseCreationRequestDTO = _mapper.Map<CourseCreationRequestDTO>(courseCreationRequest);

        return Created($"/{nameof(InitiateCourseCreation)}", courseCreationRequestDTO);
    }

    [HttpPost(nameof(InitiateCourseModification))]
    [Consumes(typeof(CourseModificationInitiationDTO), MediaTypeNames.Application.Json)]
    [Authorize(Roles = RoleNames.Initiator)]
    [SwaggerResponse(StatusCodes.Status422UnprocessableEntity, "Invalid input")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    [SwaggerResponse(StatusCodes.Status201Created, "Course modification created successfully", typeof(CourseModificationRequestDTO))]
    public async Task<ActionResult> InitiateCourseModification([FromBody, Required] CourseModificationInitiationDTO modification)
    {
        Guid userId = Guid.Parse(_userService.GetCurrentUserClaim(Claims.Id));
        var courseModificationRequest = await _courseService.InitiateCourseModification(modification, userId);
        var courseModificationRequestDTO = _mapper.Map<CourseModificationRequestDTO>(courseModificationRequest);

        return Created($"/{nameof(InitiateCourseModification)}", courseModificationRequestDTO);
    }

    [HttpGet(nameof(GetCourseData) + "/{subject}" + "/{catalog}")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course data retrieved")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "User is not authorized")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    public async Task<ActionResult> GetCourseData([FromRoute, Required] string subject, string catalog)
    {
        var courseData = await _courseService.GetCourseData(subject, catalog);
        var courseDataDTOs = _mapper.Map<CourseDataDTO>(courseData);
        _logger.LogInformation(string.Join(",", courseDataDTOs));
        return Ok(courseDataDTOs);
    }

    [HttpPost(nameof(InitiateCourseDeletion))]
    [Consumes(typeof(CourseDeletionInitiationDTO), MediaTypeNames.Application.Json)]
    [Authorize(Roles = RoleNames.Initiator)]
    [SwaggerResponse(StatusCodes.Status422UnprocessableEntity, "Invalid input")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    [SwaggerResponse(StatusCodes.Status201Created, "Course deletion created successfully", typeof(CourseDeletionRequestDTO))]
    public async Task<ActionResult> InitiateCourseDeletion([FromBody, Required] CourseDeletionInitiationDTO deletion)
    {
        Guid userId = Guid.Parse(_userService.GetCurrentUserClaim(Claims.Id));
        var courseDeletionRequest = await _courseService.InitiateCourseDeletion(deletion, userId);
        var courseDeletionRequestDTO = _mapper.Map<CourseDeletionRequestDTO>(courseDeletionRequest);

        return Created($"/{nameof(InitiateCourseDeletion)}", courseDeletionRequestDTO);
    }

    [HttpPut(nameof(EditCourseCreationRequest) + "/{dossierId}")]
    [Authorize(Policies.IsOwnerOfDossier)]
    [SwaggerResponse(StatusCodes.Status422UnprocessableEntity, "Invalid input")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course creation request modified successfully", typeof(EditCourseCreationRequestDTO))]
    public async Task<ActionResult> EditCourseCreationRequest([FromBody, Required] EditCourseCreationRequestDTO edit)
    {
        var editedCourseCreatioRequest = await _courseService.EditCourseCreationRequest(edit);
        var editedCourseCreationRequestDTO = _mapper.Map<CourseCreationRequestDTO>(editedCourseCreatioRequest);

        return Ok(editedCourseCreationRequestDTO);
    }


    [HttpPut(nameof(EditCourseModificationRequest) + "/{dossierId}")]
    [Authorize(Policies.IsOwnerOfDossier)]
    [SwaggerResponse(StatusCodes.Status422UnprocessableEntity, "Invalid input")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course modfication request edited successfully", typeof(EditCourseModificationRequestDTO))]
    public async Task<ActionResult> EditCourseModificationRequest([FromBody, Required] EditCourseModificationRequestDTO edit)
    {
        var editedCourseModificationRequest = await _courseService.EditCourseModificationRequest(edit);
        var editedCourseModificationRequestDTO = _mapper.Map<CourseModificationRequestDTO>(editedCourseModificationRequest);

        return Ok(editedCourseModificationRequestDTO);
    }

    [HttpDelete(nameof(DeleteCourseCreationRequest) + "/{dossierId}" + "/{courseRequestId}")]
    [Authorize(Policies.IsOwnerOfDossier)]
    [SwaggerResponse(StatusCodes.Status422UnprocessableEntity, "Invalid input")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    [SwaggerResponse(StatusCodes.Status204NoContent, "Course creation request deleted successfully")]
    public async Task<ActionResult> DeleteCourseCreationRequest([FromRoute, Required] Guid courseRequestId)
    {
        await _courseService.DeleteCourseCreationRequest(courseRequestId);
        return NoContent();
    }

    [HttpDelete(nameof(DeleteCourseModificationRequest) + "/{dossierId}" + "/{courseRequestId}")]
    [Authorize(Policies.IsOwnerOfDossier)]
    [SwaggerResponse(StatusCodes.Status422UnprocessableEntity, "Invalid input")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    [SwaggerResponse(StatusCodes.Status204NoContent, "Course modification request deleted successfully")]
    public async Task<ActionResult> DeleteCourseModificationRequest([FromRoute, Required] Guid courseRequestId)
    {
        await _courseService.DeleteCourseModificationRequest(courseRequestId);
        return NoContent();
    }
}
