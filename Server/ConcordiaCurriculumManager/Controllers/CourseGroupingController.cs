﻿using AutoMapper;
using ConcordiaCurriculumManager.DTO;
using ConcordiaCurriculumManager.DTO.CourseGrouping;
using ConcordiaCurriculumManager.Filters.Exceptions;
using ConcordiaCurriculumManager.Models.Curriculum.CourseGrouping;
using ConcordiaCurriculumManager.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace ConcordiaCurriculumManager.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class CourseGroupingController : Controller
{
    private readonly IMapper _mapper;
    private readonly ICourseGroupingService _courseGroupingService;

    public CourseGroupingController(ICourseGroupingService courseGroupingService, IMapper mapper)
    {
        _courseGroupingService = courseGroupingService;
        _mapper = mapper;
    }

    [HttpGet(nameof(GetCourseGrouping) + "/{courseGroupingId}")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course grouping data retrieved")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "User is not authorized")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    public async Task<ActionResult> GetCourseGrouping([FromRoute, Required] Guid courseGroupingId)
    {
        var courseGrouping = await _courseGroupingService.GetCourseGrouping(courseGroupingId);
        var courseGroupingDTO = _mapper.Map<CourseGroupingDTO>(courseGrouping);

        return Ok(courseGroupingDTO);
    }

    [HttpGet(nameof(GetCourseGroupingsBySchool) + "/{school}")]
    [SwaggerResponse(StatusCodes.Status200OK, "Course grouping data retrieved")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "User is not authorized")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    public async Task<ActionResult> GetCourseGroupingsBySchool([FromRoute, Required] SchoolEnum school)
    {
        var courseGroupings = await _courseGroupingService.GetCourseGroupingsBySchoolNonRecursive(school);
        var courseGroupingDTOs = _mapper.Map<ICollection<CourseGroupingDTO>>(courseGroupings);

        return Ok(courseGroupingDTOs);
    }

    [HttpGet(nameof(SearchCourseGroupingsByName))]
    [SwaggerResponse(StatusCodes.Status200OK, "Course grouping data retrieved")]
    [SwaggerResponse(StatusCodes.Status401Unauthorized, "User is not authorized")]
    [SwaggerResponse(StatusCodes.Status500InternalServerError, "Unexpected error")]
    public async Task<ActionResult> SearchCourseGroupingsByName([FromQuery, Required] string name)
    {
        var courseGroupings = await _courseGroupingService.GetCourseGroupingsLikeName(name.Trim());
        var courseGroupingDTOs = _mapper.Map<ICollection<CourseGroupingDTO>>(courseGroupings);

        return Ok(courseGroupingDTOs);
    }
}