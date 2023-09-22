﻿// <auto-generated />
using System;
using ConcordiaCurriculumManager.Models.Users;
using ConcordiaCurriculumManager.Repositories.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ConcordiaCurriculumManager.Migrations
{
    [DbContext(typeof(CCMDbContext))]
    [Migration("20230919014340_AddCoursesAndCourseCreationDossier")]
    partial class AddCoursesAndCourseCreationDossier
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                            Id = new Guid("9cead84f-9656-448e-9534-d007848ab8c8"),
                            ComponentCode = 0,
                            ComponentName = "Conference",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1133),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1135)
                        },
                        new
                        {
                            Id = new Guid("8f9456d2-5b42-418d-8908-8a8bd8e99078"),
                            ComponentCode = 1,
                            ComponentName = "Field Studies",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1147),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1148)
                        },
                        new
                        {
                            Id = new Guid("b6a02ff4-ab79-43a0-b8c8-de7d017d6e1b"),
                            ComponentCode = 2,
                            ComponentName = "Fieldwork",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1179),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1179)
                        },
                        new
                        {
                            Id = new Guid("afc3f669-562e-4359-8559-cc31ea6a83e5"),
                            ComponentCode = 3,
                            ComponentName = "Independent Study",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1185),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1186)
                        },
                        new
                        {
                            Id = new Guid("f058d35d-a3e5-4cb7-89d7-857f76760bab"),
                            ComponentCode = 4,
                            ComponentName = "Laboratory",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1191),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1192)
                        },
                        new
                        {
                            Id = new Guid("cbb2b0d3-1706-479d-8d0e-8aaa728ddd2a"),
                            ComponentCode = 5,
                            ComponentName = "Lecture",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1202),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1203)
                        },
                        new
                        {
                            Id = new Guid("59b2ac3a-b02c-47e7-9f67-087427e1a331"),
                            ComponentCode = 6,
                            ComponentName = "Modular",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1209),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1209)
                        },
                        new
                        {
                            Id = new Guid("351b6279-f0db-4ad7-8027-baffc048fbaf"),
                            ComponentCode = 7,
                            ComponentName = "Online",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1215),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1216)
                        },
                        new
                        {
                            Id = new Guid("ba2fe855-b30d-4df6-a6cc-c58820107d68"),
                            ComponentCode = 8,
                            ComponentName = "Practicum/Internship/Work-Term",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1221),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1222)
                        },
                        new
                        {
                            Id = new Guid("7867c383-c2c6-462d-8331-9c69506c31d3"),
                            ComponentCode = 9,
                            ComponentName = "Private Studies",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1230),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1231)
                        },
                        new
                        {
                            Id = new Guid("e672cc87-ee26-4b90-b34d-0103cdd3b739"),
                            ComponentCode = 10,
                            ComponentName = "Reading",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1245),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1245)
                        },
                        new
                        {
                            Id = new Guid("6a6dcdb5-d85e-4073-99ba-1dbb1004594b"),
                            ComponentCode = 11,
                            ComponentName = "Regular",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1251),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1252)
                        },
                        new
                        {
                            Id = new Guid("420282c4-7604-4a62-baa7-3525b90ee356"),
                            ComponentCode = 12,
                            ComponentName = "Research",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1257),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1258)
                        },
                        new
                        {
                            Id = new Guid("15dccf3e-bb40-4c83-9cc9-1a44c06442b8"),
                            ComponentCode = 13,
                            ComponentName = "Seminar",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1263),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1264)
                        },
                        new
                        {
                            Id = new Guid("ecfb9ee8-35f9-4bed-9f96-769e0c5ab6c8"),
                            ComponentCode = 14,
                            ComponentName = "Studio",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1269),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1270)
                        },
                        new
                        {
                            Id = new Guid("976ddabe-458a-4027-aab1-4a28b9323063"),
                            ComponentCode = 15,
                            ComponentName = "Thesis Research",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1275),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1275)
                        },
                        new
                        {
                            Id = new Guid("32834c9f-513c-472a-a58b-52973fe9ac0b"),
                            ComponentCode = 16,
                            ComponentName = "Tutorial",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1280),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1281)
                        },
                        new
                        {
                            Id = new Guid("9f34a24c-586c-4102-8667-6a8efad8da4b"),
                            ComponentCode = 17,
                            ComponentName = "Tutorial/Lab",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1288),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1289)
                        },
                        new
                        {
                            Id = new Guid("ca63bbcb-0d6f-4731-a412-a60c96176d59"),
                            ComponentCode = 18,
                            ComponentName = "Workshop",
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1301),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 211, DateTimeKind.Utc).AddTicks(1302)
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
                            Id = new Guid("3db4e489-e8a7-4e0e-a82b-e2221a8d802d"),
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8617),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8626),
                            UserRole = RoleEnum.Initiator
                        },
                        new
                        {
                            Id = new Guid("49bf28ac-97d0-4bbb-901e-a06206e4f626"),
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8639),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8640),
                            UserRole = RoleEnum.Admin
                        },
                        new
                        {
                            Id = new Guid("b981ecac-ddf9-4a0a-9f55-7222fbecc65b"),
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8646),
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8647),
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
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8828),
                            Email = "admin@ccm.ca",
                            FirstName = "Super",
                            LastName = "User",
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8829),
                            Password = "9767718E8A58C097D48ED8986E632368F71F71740C6DCE113AE75ED90176DA49:FE06FEFB87C75014327930CFB3373565"
                        },
                        new
                        {
                            Id = new Guid("8c55b0c3-b4cf-4948-a730-dad3fa37c69a"),
                            CreatedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8872),
                            Email = "joe.user@ccm.ca",
                            FirstName = "Joe",
                            LastName = "User",
                            ModifiedDate = new DateTime(2023, 9, 19, 1, 43, 40, 210, DateTimeKind.Utc).AddTicks(8872),
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
                            RolesId = new Guid("49bf28ac-97d0-4bbb-901e-a06206e4f626"),
                            UsersId = new Guid("37581d9d-713f-475c-9668-23971b0e64d0")
                        },
                        new
                        {
                            RolesId = new Guid("3db4e489-e8a7-4e0e-a82b-e2221a8d802d"),
                            UsersId = new Guid("8c55b0c3-b4cf-4948-a730-dad3fa37c69a")
                        },
                        new
                        {
                            RolesId = new Guid("b981ecac-ddf9-4a0a-9f55-7222fbecc65b"),
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