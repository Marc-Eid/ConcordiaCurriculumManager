using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcordiaCurriculumManager.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CourseComponents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ComponentCode = table.Column<int>(type: "int", nullable: false),
                    ComponentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseComponents", x => x.Id);
                    table.UniqueConstraint("AK_CourseComponents_ComponentCode", x => x.ComponentCode);
                });

            migrationBuilder.CreateTable(
                name: "CourseGroupings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommonIdentifier = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RequiredCredits = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsTopLevel = table.Column<bool>(type: "bit", nullable: false),
                    School = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<int>(type: "int", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: true),
                    Published = table.Column<bool>(type: "bit", nullable: false),
                    CourseGroupingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseGroupings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseGroupings_CourseGroupings_CourseGroupingId",
                        column: x => x.CourseGroupingId,
                        principalTable: "CourseGroupings",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CourseIdentifiers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConcordiaCourseId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseIdentifiers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HttpMetrics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Controller = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Endpoint = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResponseStatusCode = table.Column<int>(type: "int", nullable: false),
                    ResponseTimeMilliSecond = table.Column<long>(type: "bigint", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HttpMetrics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserRole = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResetPasswordToken = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseGroupingReferences",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParentGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ChildGroupCommonIdentifier = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupingType = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseGroupingReferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseGroupingReferences_CourseGroupings_ParentGroupId",
                        column: x => x.ParentGroupId,
                        principalTable: "CourseGroupings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseID = table.Column<int>(type: "int", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Catalog = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreditValue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PreReqs = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Career = table.Column<int>(type: "int", nullable: false),
                    EquivalentCourses = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CourseNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CourseState = table.Column<int>(type: "int", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: true),
                    Published = table.Column<bool>(type: "bit", nullable: false),
                    CourseGroupingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Courses_CourseGroupings_CourseGroupingId",
                        column: x => x.CourseGroupingId,
                        principalTable: "CourseGroupings",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CourseGroupingCourseIdentifier",
                columns: table => new
                {
                    CourseGroupingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseIdentifiersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseGroupingCourseIdentifier", x => new { x.CourseGroupingId, x.CourseIdentifiersId });
                    table.ForeignKey(
                        name: "FK_CourseGroupingCourseIdentifier_CourseGroupings_CourseGroupingId",
                        column: x => x.CourseGroupingId,
                        principalTable: "CourseGroupings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseGroupingCourseIdentifier_CourseIdentifiers_CourseIdentifiersId",
                        column: x => x.CourseIdentifiersId,
                        principalTable: "CourseIdentifiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dossiers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InitiatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dossiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dossiers_Users_InitiatorId",
                        column: x => x.InitiatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GroupUser",
                columns: table => new
                {
                    GroupsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MembersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupUser", x => new { x.GroupsId, x.MembersId });
                    table.ForeignKey(
                        name: "FK_GroupUser_Groups_GroupsId",
                        column: x => x.GroupsId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupUser_Users_MembersId",
                        column: x => x.MembersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GroupUser1",
                columns: table => new
                {
                    GroupMastersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MasteredGroupsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupUser1", x => new { x.GroupMastersId, x.MasteredGroupsId });
                    table.ForeignKey(
                        name: "FK_GroupUser1_Groups_MasteredGroupsId",
                        column: x => x.MasteredGroupsId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupUser1_Users_GroupMastersId",
                        column: x => x.GroupMastersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoleUser",
                columns: table => new
                {
                    RolesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleUser", x => new { x.RolesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_RoleUser_Roles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseCourseComponents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ComponentCode = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HoursPerWeek = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseCourseComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseCourseComponents_CourseComponents_ComponentCode",
                        column: x => x.ComponentCode,
                        principalTable: "CourseComponents",
                        principalColumn: "ComponentCode",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseCourseComponents_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseReferences",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseReferencingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseReferencedId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseReferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseReferences_Courses_CourseReferencedId",
                        column: x => x.CourseReferencedId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseReferences_Courses_CourseReferencingId",
                        column: x => x.CourseReferencingId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SupportingFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentBase64 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportingFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportingFiles_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApprovalHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DossierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderIndex = table.Column<int>(type: "int", nullable: false),
                    Action = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovalHistory_Dossiers_DossierId",
                        column: x => x.DossierId,
                        principalTable: "Dossiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalHistory_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalHistory_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApprovalStages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DossierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StageIndex = table.Column<int>(type: "int", nullable: false),
                    IsCurrentStage = table.Column<bool>(type: "bit", nullable: false),
                    IsFinalStage = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalStages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovalStages_Dossiers_DossierId",
                        column: x => x.DossierId,
                        principalTable: "Dossiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalStages_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseCreationRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NewCourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DossierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rationale = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResourceImplication = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Conflict = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseCreationRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseCreationRequests_Courses_NewCourseId",
                        column: x => x.NewCourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseCreationRequests_Dossiers_DossierId",
                        column: x => x.DossierId,
                        principalTable: "Dossiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseDeletionRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DossierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rationale = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResourceImplication = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Conflict = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseDeletionRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseDeletionRequests_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseDeletionRequests_Dossiers_DossierId",
                        column: x => x.DossierId,
                        principalTable: "Dossiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseGroupingRequest",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseGroupingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequestType = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DossierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rationale = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResourceImplication = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Conflict = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseGroupingRequest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseGroupingRequest_CourseGroupings_CourseGroupingId",
                        column: x => x.CourseGroupingId,
                        principalTable: "CourseGroupings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseGroupingRequest_Dossiers_DossierId",
                        column: x => x.DossierId,
                        principalTable: "Dossiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseModificationRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DossierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rationale = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResourceImplication = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Conflict = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseModificationRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseModificationRequests_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseModificationRequests_Dossiers_DossierId",
                        column: x => x.DossierId,
                        principalTable: "Dossiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DossierDiscussion",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DossierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DossierDiscussion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DossierDiscussion_Dossiers_DossierId",
                        column: x => x.DossierId,
                        principalTable: "Dossiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DossierMetrics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DossierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DossierMetrics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DossierMetrics_Dossiers_DossierId",
                        column: x => x.DossierId,
                        principalTable: "Dossiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DossierMetrics_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DiscussionMessage",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DossierDiscussionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParentDiscussionMessageId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    VoteCount = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscussionMessage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiscussionMessage_DiscussionMessage_ParentDiscussionMessageId",
                        column: x => x.ParentDiscussionMessageId,
                        principalTable: "DiscussionMessage",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DiscussionMessage_DossierDiscussion_DossierDiscussionId",
                        column: x => x.DossierDiscussionId,
                        principalTable: "DossierDiscussion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DiscussionMessage_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DiscussionMessage_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DiscussionMessageVote",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DiscussionMessageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DiscussionMessageVoteValue = table.Column<int>(type: "int", nullable: false),
                    UserId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscussionMessageVote", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DiscussionMessageVote_DiscussionMessage_DiscussionMessageId",
                        column: x => x.DiscussionMessageId,
                        principalTable: "DiscussionMessage",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DiscussionMessageVote_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DiscussionMessageVote_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHistory_DossierId",
                table: "ApprovalHistory",
                column: "DossierId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHistory_GroupId",
                table: "ApprovalHistory",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHistory_UserId",
                table: "ApprovalHistory",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalStages_DossierId",
                table: "ApprovalStages",
                column: "DossierId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalStages_GroupId",
                table: "ApprovalStages",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseCourseComponents_ComponentCode",
                table: "CourseCourseComponents",
                column: "ComponentCode");

            migrationBuilder.CreateIndex(
                name: "IX_CourseCourseComponents_CourseId",
                table: "CourseCourseComponents",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseCreationRequests_DossierId",
                table: "CourseCreationRequests",
                column: "DossierId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseCreationRequests_NewCourseId",
                table: "CourseCreationRequests",
                column: "NewCourseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseDeletionRequests_CourseId",
                table: "CourseDeletionRequests",
                column: "CourseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseDeletionRequests_DossierId",
                table: "CourseDeletionRequests",
                column: "DossierId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseGroupingCourseIdentifier_CourseIdentifiersId",
                table: "CourseGroupingCourseIdentifier",
                column: "CourseIdentifiersId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseGroupingReferences_ParentGroupId",
                table: "CourseGroupingReferences",
                column: "ParentGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseGroupingRequest_CourseGroupingId",
                table: "CourseGroupingRequest",
                column: "CourseGroupingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseGroupingRequest_DossierId",
                table: "CourseGroupingRequest",
                column: "DossierId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseGroupings_CourseGroupingId",
                table: "CourseGroupings",
                column: "CourseGroupingId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseModificationRequests_CourseId",
                table: "CourseModificationRequests",
                column: "CourseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseModificationRequests_DossierId",
                table: "CourseModificationRequests",
                column: "DossierId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseReferences_CourseReferencedId",
                table: "CourseReferences",
                column: "CourseReferencedId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseReferences_CourseReferencingId",
                table: "CourseReferences",
                column: "CourseReferencingId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CourseGroupingId",
                table: "Courses",
                column: "CourseGroupingId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionMessage_AuthorId",
                table: "DiscussionMessage",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionMessage_DossierDiscussionId",
                table: "DiscussionMessage",
                column: "DossierDiscussionId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionMessage_GroupId",
                table: "DiscussionMessage",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionMessage_ParentDiscussionMessageId",
                table: "DiscussionMessage",
                column: "ParentDiscussionMessageId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionMessageVote_DiscussionMessageId",
                table: "DiscussionMessageVote",
                column: "DiscussionMessageId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionMessageVote_UserId_DiscussionMessageId",
                table: "DiscussionMessageVote",
                columns: new[] { "UserId", "DiscussionMessageId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DiscussionMessageVote_UserId1",
                table: "DiscussionMessageVote",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_DossierDiscussion_DossierId",
                table: "DossierDiscussion",
                column: "DossierId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DossierMetrics_DossierId",
                table: "DossierMetrics",
                column: "DossierId");

            migrationBuilder.CreateIndex(
                name: "IX_DossierMetrics_UserId",
                table: "DossierMetrics",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Dossiers_InitiatorId",
                table: "Dossiers",
                column: "InitiatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_Name",
                table: "Groups",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GroupUser_MembersId",
                table: "GroupUser",
                column: "MembersId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupUser1_MasteredGroupsId",
                table: "GroupUser1",
                column: "MasteredGroupsId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleUser_UsersId",
                table: "RoleUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportingFiles_CourseId",
                table: "SupportingFiles",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalHistory");

            migrationBuilder.DropTable(
                name: "ApprovalStages");

            migrationBuilder.DropTable(
                name: "CourseCourseComponents");

            migrationBuilder.DropTable(
                name: "CourseCreationRequests");

            migrationBuilder.DropTable(
                name: "CourseDeletionRequests");

            migrationBuilder.DropTable(
                name: "CourseGroupingCourseIdentifier");

            migrationBuilder.DropTable(
                name: "CourseGroupingReferences");

            migrationBuilder.DropTable(
                name: "CourseGroupingRequest");

            migrationBuilder.DropTable(
                name: "CourseModificationRequests");

            migrationBuilder.DropTable(
                name: "CourseReferences");

            migrationBuilder.DropTable(
                name: "DiscussionMessageVote");

            migrationBuilder.DropTable(
                name: "DossierMetrics");

            migrationBuilder.DropTable(
                name: "GroupUser");

            migrationBuilder.DropTable(
                name: "GroupUser1");

            migrationBuilder.DropTable(
                name: "HttpMetrics");

            migrationBuilder.DropTable(
                name: "RoleUser");

            migrationBuilder.DropTable(
                name: "SupportingFiles");

            migrationBuilder.DropTable(
                name: "CourseComponents");

            migrationBuilder.DropTable(
                name: "CourseIdentifiers");

            migrationBuilder.DropTable(
                name: "DiscussionMessage");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "DossierDiscussion");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "CourseGroupings");

            migrationBuilder.DropTable(
                name: "Dossiers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
