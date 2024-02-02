﻿using ConcordiaCurriculumManager.DTO.CourseGrouping;
using ConcordiaCurriculumManager.Models.Curriculum.Dossiers;
using NpgsqlTypes;

namespace ConcordiaCurriculumManager.Models.Curriculum.CourseGroupings;

public class CourseGrouping : BaseModel
{
    public required Guid CommonIdentifier { get; set; }
    public required string Name { get; set; }
    public required string RequiredCredits { get; set; }
    public required bool IsTopLevel { get; set; }
    public required SchoolEnum School { get; set; }
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public required CourseGroupingStateEnum State { get; set; }
    public int? Version { get; set; }
    public required bool Published { get; set; }
    public required ICollection<CourseGroupingReference> SubGroupingReferences { get; set; } = new List<CourseGroupingReference>();
    public required ICollection<CourseGrouping> SubGroupings { get; set; } = new List<CourseGrouping>();
    public required ICollection<CourseIdentifier> CourseIdentifiers { get; set; } = new List<CourseIdentifier>();
    public required ICollection<Course> Courses { get; set; } = new List<Course>();
    public CourseGroupingRequest? CourseGroupingRequest { get; set; }

    public static CourseGrouping CreateCourseGroupingFromCreationDTO(Guid id, CourseGroupingInputDTO dto) =>
        CreateCourseGroupingFromDTO(id, dto, Guid.NewGuid(), CourseGroupingStateEnum.NewCourseGroupingProposal);

    public static CourseGrouping CreateCourseGroupingFromModificationDTO(Guid id, CourseGroupingModificationInputDTO dto) =>
        CreateCourseGroupingFromDTO(id, dto, dto.CommonIdentifier, CourseGroupingStateEnum.CourseGroupingChangeProposal);

    private static CourseGrouping CreateCourseGroupingFromDTO(Guid id,CourseGroupingInputDTO dto, Guid commonId, CourseGroupingStateEnum state)
    {
        return new CourseGrouping
        {
            Id = id,
            CommonIdentifier = commonId,
            Name = dto.Name,
            RequiredCredits = dto.RequiredCredits,
            IsTopLevel = dto.IsTopLevel,
            School = dto.School,
            Description = dto.Description,
            Notes = dto.Notes,
            State = state,
            Version = null,
            Published = false,
            SubGroupingReferences = CourseGroupingReference.CreateCourseGroupingReferencesFromDTO(id, dto.SubGroupingReferences),
            SubGroupings = new List<CourseGrouping>(),
            CourseIdentifiers = CourseIdentifier.CreateCourseIdentifiersFromDTO(dto.CourseIdentifiers),
            Courses = new List<Course>()
        };
    }
}

public enum SchoolEnum
{
    [PgName(nameof(GinaCody))]
    GinaCody,

    [PgName(nameof(ArtsAndScience))]
    ArtsAndScience,

    [PgName(nameof(FineArts))]
    FineArts,

    [PgName(nameof(JMSB))]
    JMSB
}

public enum CourseGroupingStateEnum
{
    [PgName(nameof(Accepted))]
    Accepted,

    [PgName(nameof(NewCourseGroupingProposal))]
    NewCourseGroupingProposal,

    [PgName(nameof(CourseGroupingChangeProposal))]
    CourseGroupingChangeProposal,

    [PgName(nameof(CourseGroupingDeletionProposal))]
    CourseGroupingDeletionProposal,

    [PgName(nameof(Deleted))]
    Deleted
}