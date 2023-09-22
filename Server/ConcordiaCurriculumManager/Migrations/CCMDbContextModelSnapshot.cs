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
                        .IsRequired()
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
                            Id = new Guid("a11646af-2c24-4c24-8f00-6db0d263c8d1"),
                            ComponentCode = 0,
                            ComponentName = "Conference",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4898),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4901)
                        },
                        new
                        {
                            Id = new Guid("901ee4da-c5c3-46ed-b6ea-2fead13c2f64"),
                            ComponentCode = 1,
                            ComponentName = "Field Studies",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4913),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4914)
                        },
                        new
                        {
                            Id = new Guid("23ffe188-2d91-4b8b-8dfd-bee6bf56c31d"),
                            ComponentCode = 2,
                            ComponentName = "Fieldwork",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4920),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4921)
                        },
                        new
                        {
                            Id = new Guid("cb796e74-9ddf-4959-b176-c709180f9966"),
                            ComponentCode = 3,
                            ComponentName = "Independent Study",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4953),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4954)
                        },
                        new
                        {
                            Id = new Guid("8dc1f72a-12bb-4ed5-aa9c-71212fbdcbfd"),
                            ComponentCode = 4,
                            ComponentName = "Laboratory",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4959),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4960)
                        },
                        new
                        {
                            Id = new Guid("67c60f9a-596a-4195-834e-b9d8cac30f8d"),
                            ComponentCode = 5,
                            ComponentName = "Lecture",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4971),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4972)
                        },
                        new
                        {
                            Id = new Guid("4bc39865-9eac-48fc-a712-4fa9b4103897"),
                            ComponentCode = 6,
                            ComponentName = "Modular",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4978),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4979)
                        },
                        new
                        {
                            Id = new Guid("f9366a9e-d10f-4272-987e-cf0f76aa1f70"),
                            ComponentCode = 7,
                            ComponentName = "Online",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4984),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4985)
                        },
                        new
                        {
                            Id = new Guid("5f9d5ac4-9744-4213-8d50-e198b291122a"),
                            ComponentCode = 8,
                            ComponentName = "Practicum/Internship/Work-Term",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4990),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4991)
                        },
                        new
                        {
                            Id = new Guid("57217549-8112-4fda-8c27-876a2235be28"),
                            ComponentCode = 9,
                            ComponentName = "Private Studies",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(4999),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5000)
                        },
                        new
                        {
                            Id = new Guid("b7836b6c-d6eb-4ed4-915e-f5cbcefda6a1"),
                            ComponentCode = 10,
                            ComponentName = "Reading",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5005),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5006)
                        },
                        new
                        {
                            Id = new Guid("4e7ccef5-7085-4fc6-89e3-f3b110ad2096"),
                            ComponentCode = 11,
                            ComponentName = "Regular",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5019),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5020)
                        },
                        new
                        {
                            Id = new Guid("80f256b6-acbd-473a-a50d-21bb5ad69b2b"),
                            ComponentCode = 12,
                            ComponentName = "Research",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5025),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5026)
                        },
                        new
                        {
                            Id = new Guid("9ba472c9-4679-4c5a-8ff2-076cfea64e09"),
                            ComponentCode = 13,
                            ComponentName = "Seminar",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5031),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5032)
                        },
                        new
                        {
                            Id = new Guid("faee414a-45db-47f4-93a4-7c07077b4c4a"),
                            ComponentCode = 14,
                            ComponentName = "Studio",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5037),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5038)
                        },
                        new
                        {
                            Id = new Guid("0e926b23-77a8-4ebe-a066-1599d91696b5"),
                            ComponentCode = 15,
                            ComponentName = "Thesis Research",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5043),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5044)
                        },
                        new
                        {
                            Id = new Guid("afdc1405-6719-4c93-a1e5-6bf7b6eb824c"),
                            ComponentCode = 16,
                            ComponentName = "Tutorial",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5049),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5050)
                        },
                        new
                        {
                            Id = new Guid("36b7f570-8674-4ed8-8809-96b2f475f193"),
                            ComponentCode = 17,
                            ComponentName = "Tutorial/Lab",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5058),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5059)
                        },
                        new
                        {
                            Id = new Guid("511ca93c-4bf9-43ad-a734-06a95b243d54"),
                            ComponentCode = 18,
                            ComponentName = "Workshop",
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5242),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(5243)
                        });
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
                            Id = new Guid("d580aa57-6184-4ce0-8e5d-c557a2e259a2"),
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2529),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2535),
                            UserRole = RoleEnum.Initiator
                        },
                        new
                        {
                            Id = new Guid("91a246e2-f75b-41f4-9678-7093535eaa08"),
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2551),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2552),
                            UserRole = RoleEnum.Admin
                        },
                        new
                        {
                            Id = new Guid("9fd315d3-65a4-4718-91f2-ffa33e069744"),
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2561),
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2562),
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
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2755),
                            Email = "admin@ccm.ca",
                            FirstName = "Super",
                            LastName = "User",
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2756),
                            Password = "9767718E8A58C097D48ED8986E632368F71F71740C6DCE113AE75ED90176DA49:FE06FEFB87C75014327930CFB3373565"
                        },
                        new
                        {
                            Id = new Guid("8c55b0c3-b4cf-4948-a730-dad3fa37c69a"),
                            CreatedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2901),
                            Email = "joe.user@ccm.ca",
                            FirstName = "Joe",
                            LastName = "User",
                            ModifiedDate = new DateTime(2023, 9, 19, 2, 21, 2, 668, DateTimeKind.Utc).AddTicks(2902),
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
                            RolesId = new Guid("91a246e2-f75b-41f4-9678-7093535eaa08"),
                            UsersId = new Guid("37581d9d-713f-475c-9668-23971b0e64d0")
                        },
                        new
                        {
                            RolesId = new Guid("d580aa57-6184-4ce0-8e5d-c557a2e259a2"),
                            UsersId = new Guid("8c55b0c3-b4cf-4948-a730-dad3fa37c69a")
                        },
                        new
                        {
                            RolesId = new Guid("9fd315d3-65a4-4718-91f2-ffa33e069744"),
                            UsersId = new Guid("8c55b0c3-b4cf-4948-a730-dad3fa37c69a")
                        });
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
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Users.User", b =>
                {
                    b.Navigation("CourseCreationDossiers");
                });
#pragma warning restore 612, 618
        }
    }
}
