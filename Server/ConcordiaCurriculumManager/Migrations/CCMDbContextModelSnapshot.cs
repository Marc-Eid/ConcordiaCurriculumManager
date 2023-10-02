﻿// <auto-generated />
using System;
using ConcordiaCurriculumManager.Models.Users;
using ConcordiaCurriculumManager.Repositories.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ConcordiaCurriculumManager.Migrations
{
    [DbContext(typeof(CCMDbContext))]
    partial class CCMDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "role_enum", new[] { "Initiator", "Admin", "FacultyMember" });
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Course", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Career")
                        .HasColumnType("integer");

                    b.Property<string>("Catalog")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("CourseID")
                        .HasColumnType("integer");

                    b.Property<int>("CourseState")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CreditValue")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("EquivalentCourses")
                        .HasColumnType("text");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PreReqs")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Published")
                        .HasColumnType("boolean");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Version")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.CourseComponent", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("ComponentCode")
                        .HasColumnType("integer");

                    b.Property<string>("ComponentName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("CourseComponents");

                    b.HasData(
                        new
                        {
                            Id = new Guid("202bf127-aa1c-4d73-b299-fe0e0ee6e870"),
                            ComponentCode = 0,
                            ComponentName = "Conference",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7240),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7244)
                        },
                        new
                        {
                            Id = new Guid("11ed757c-e78e-4976-a0c2-df020589feb4"),
                            ComponentCode = 1,
                            ComponentName = "Field Studies",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7257),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7258)
                        },
                        new
                        {
                            Id = new Guid("7900cb88-e1fa-4d19-8a6e-ac209143ef7c"),
                            ComponentCode = 2,
                            ComponentName = "Fieldwork",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7263),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7264)
                        },
                        new
                        {
                            Id = new Guid("45c332ea-194a-4188-818c-e83ad5bf27fd"),
                            ComponentCode = 3,
                            ComponentName = "Independent Study",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7294),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7295)
                        },
                        new
                        {
                            Id = new Guid("1c314d45-66ad-4940-ab4a-4db888d4bd03"),
                            ComponentCode = 4,
                            ComponentName = "Laboratory",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7301),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7302)
                        },
                        new
                        {
                            Id = new Guid("cc11932a-18b6-4b60-a1d2-e8aee6ed82d0"),
                            ComponentCode = 5,
                            ComponentName = "Lecture",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7311),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7311)
                        },
                        new
                        {
                            Id = new Guid("5673b664-19ef-4310-9974-591ce1b28fae"),
                            ComponentCode = 6,
                            ComponentName = "Modular",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7317),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7318)
                        },
                        new
                        {
                            Id = new Guid("8b0ca142-0557-4e9d-9790-5a3351621ae5"),
                            ComponentCode = 7,
                            ComponentName = "Online",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7324),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7325)
                        },
                        new
                        {
                            Id = new Guid("f897d433-3492-478e-9b78-9a2290ae2b2d"),
                            ComponentCode = 8,
                            ComponentName = "Practicum/Internship/Work-Term",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7331),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7332)
                        },
                        new
                        {
                            Id = new Guid("9a476a2d-a1b9-4ebc-8137-1616563ca3ad"),
                            ComponentCode = 9,
                            ComponentName = "Private Studies",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7340),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7341)
                        },
                        new
                        {
                            Id = new Guid("c58dea6f-674f-41e9-9f4c-9773fa3ecb0b"),
                            ComponentCode = 10,
                            ComponentName = "Reading",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7346),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7347)
                        },
                        new
                        {
                            Id = new Guid("da3cce51-355c-4155-81ee-94b6723533b0"),
                            ComponentCode = 11,
                            ComponentName = "Regular",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7360),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7361)
                        },
                        new
                        {
                            Id = new Guid("ce741335-dee2-4016-bc55-079412462524"),
                            ComponentCode = 12,
                            ComponentName = "Research",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7366),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7366)
                        },
                        new
                        {
                            Id = new Guid("e4578eb5-cb0e-4559-8977-4634f51bf685"),
                            ComponentCode = 13,
                            ComponentName = "Seminar",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7372),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7372)
                        },
                        new
                        {
                            Id = new Guid("d165dc5d-38fd-4d4f-b8b9-eee89c63e120"),
                            ComponentCode = 14,
                            ComponentName = "Studio",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7377),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7378)
                        },
                        new
                        {
                            Id = new Guid("120613a0-b0ca-420f-98b9-9595786253e5"),
                            ComponentCode = 15,
                            ComponentName = "Thesis Research",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7383),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7384)
                        },
                        new
                        {
                            Id = new Guid("d566a8f5-5f2f-4474-a211-4bd3659fa723"),
                            ComponentCode = 16,
                            ComponentName = "Tutorial",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7389),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7390)
                        },
                        new
                        {
                            Id = new Guid("05f44b42-60cc-4b7b-9c9a-7155f2e02b77"),
                            ComponentCode = 17,
                            ComponentName = "Tutorial/Lab",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7397),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7398)
                        },
                        new
                        {
                            Id = new Guid("d9cd8bd5-01a3-433a-b07e-5c91919e33df"),
                            ComponentCode = 18,
                            ComponentName = "Workshop",
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7403),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(7404)
                        });
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.CourseReference", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CourseReferencedId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("CourseReferencingId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CourseReferencedId");

                    b.HasIndex("CourseReferencingId");

                    b.ToTable("CourseReferences");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossier.CourseCreationDossier", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("InitiatorId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("NewCourseId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("InitiatorId");

                    b.HasIndex("NewCourseId")
                        .IsUnique();

                    b.ToTable("CourseCreationDossiers");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.Dossier", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("InitiatorId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("Published")
                        .HasColumnType("boolean");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("InitiatorId");

                    b.ToTable("Dossiers");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Users.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<RoleEnum>("UserRole")
                        .HasColumnType("role_enum");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = new Guid("f0ad73eb-fdbc-4169-b431-c249d37b3ec0"),
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5115),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5121),
                            UserRole = RoleEnum.Initiator
                        },
                        new
                        {
                            Id = new Guid("e8083566-ff8c-4b6b-946a-77c97d0964b6"),
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5133),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5135),
                            UserRole = RoleEnum.Admin
                        },
                        new
                        {
                            Id = new Guid("9e2718e5-56d7-498d-ac6b-82a440a000b4"),
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5141),
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5142),
                            UserRole = RoleEnum.FacultyMember
                        });
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Users.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("37581d9d-713f-475c-9668-23971b0e64d0"),
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5321),
                            Email = "admin@ccm.ca",
                            FirstName = "Super",
                            LastName = "User",
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5322),
                            Password = "9767718E8A58C097D48ED8986E632368F71F71740C6DCE113AE75ED90176DA49:FE06FEFB87C75014327930CFB3373565"
                        },
                        new
                        {
                            Id = new Guid("8c55b0c3-b4cf-4948-a730-dad3fa37c69a"),
                            CreatedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5454),
                            Email = "joe.user@ccm.ca",
                            FirstName = "Joe",
                            LastName = "User",
                            ModifiedDate = new DateTime(2023, 10, 2, 0, 43, 50, 236, DateTimeKind.Utc).AddTicks(5455),
                            Password = "DAFBF72A150765D4DDDB5089E2D8516F5C68A00DD77930F2F4C013CB89DB8E77:B497E6DD99B7DD2ED2632F5A136A8788"
                        });
                });

            modelBuilder.Entity("CourseCourseComponent", b =>
                {
                    b.Property<Guid>("CourseComponentsId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("CoursesId")
                        .HasColumnType("uuid");

                    b.HasKey("CourseComponentsId", "CoursesId");

                    b.HasIndex("CoursesId");

                    b.ToTable("CourseCourseComponent");
                });

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.Property<Guid>("RolesId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UsersId")
                        .HasColumnType("uuid");

                    b.HasKey("RolesId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("RoleUser");

                    b.HasData(
                        new
                        {
                            RolesId = new Guid("e8083566-ff8c-4b6b-946a-77c97d0964b6"),
                            UsersId = new Guid("37581d9d-713f-475c-9668-23971b0e64d0")
                        },
                        new
                        {
                            RolesId = new Guid("f0ad73eb-fdbc-4169-b431-c249d37b3ec0"),
                            UsersId = new Guid("8c55b0c3-b4cf-4948-a730-dad3fa37c69a")
                        },
                        new
                        {
                            RolesId = new Guid("9e2718e5-56d7-498d-ac6b-82a440a000b4"),
                            UsersId = new Guid("8c55b0c3-b4cf-4948-a730-dad3fa37c69a")
                        });
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.CourseReference", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.Course", "CourseReferenced")
                        .WithMany("CourseReferenced")
                        .HasForeignKey("CourseReferencedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.Course", "CourseReferencing")
                        .WithMany("CourseReferencing")
                        .HasForeignKey("CourseReferencingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CourseReferenced");

                    b.Navigation("CourseReferencing");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossier.CourseCreationDossier", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Users.User", "Initiator")
                        .WithMany("CourseCreationDossiers")
                        .HasForeignKey("InitiatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.Course", "NewCourse")
                        .WithOne("CourseCreationDossier")
                        .HasForeignKey("ConcordiaCurriculumManager.Models.Curriculum.Dossier.CourseCreationDossier", "NewCourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Initiator");

                    b.Navigation("NewCourse");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.Dossier", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Users.User", "Initiator")
                        .WithMany("Dossiers")
                        .HasForeignKey("InitiatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Initiator");
                });

            modelBuilder.Entity("CourseCourseComponent", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.CourseComponent", null)
                        .WithMany()
                        .HasForeignKey("CourseComponentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.Course", null)
                        .WithMany()
                        .HasForeignKey("CoursesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Users.Role", null)
                        .WithMany()
                        .HasForeignKey("RolesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConcordiaCurriculumManager.Models.Users.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Course", b =>
                {
                    b.Navigation("CourseCreationDossier");

                    b.Navigation("CourseReferenced");

                    b.Navigation("CourseReferencing");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Users.User", b =>
                {
                    b.Navigation("CourseCreationDossiers");

                    b.Navigation("Dossiers");
                });
#pragma warning restore 612, 618
        }
    }
}
