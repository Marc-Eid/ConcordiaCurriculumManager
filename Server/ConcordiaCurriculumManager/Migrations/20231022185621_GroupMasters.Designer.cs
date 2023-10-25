﻿// <auto-generated />
using System;
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
    [Migration("20231022185621_GroupMasters")]
    partial class GroupMasters
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

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

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.CourseCreationRequest", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("DossierId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("NewCourseId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("DossierId");

                    b.HasIndex("NewCourseId")
                        .IsUnique();

                    b.ToTable("CourseCreationRequests");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.CourseModificationRequest", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CourseId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("DossierId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CourseId")
                        .IsUnique();

                    b.HasIndex("DossierId");

                    b.ToTable("CourseModificationRequests");
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

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Users.Group", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Groups");
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

                    b.Property<int>("UserRole")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Roles");
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

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
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

            modelBuilder.Entity("GroupUser", b =>
                {
                    b.Property<Guid>("GroupsId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("MembersId")
                        .HasColumnType("uuid");

                    b.HasKey("GroupsId", "MembersId");

                    b.HasIndex("MembersId");

                    b.ToTable("GroupUser");
                });

            modelBuilder.Entity("GroupUser1", b =>
                {
                    b.Property<Guid>("GroupMastersId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("MasteredGroupsId")
                        .HasColumnType("uuid");

                    b.HasKey("GroupMastersId", "MasteredGroupsId");

                    b.HasIndex("MasteredGroupsId");

                    b.ToTable("GroupUser1");
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

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.CourseCreationRequest", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.Dossier", "Dossier")
                        .WithMany("CourseCreationRequests")
                        .HasForeignKey("DossierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.Course", "NewCourse")
                        .WithOne("CourseCreationRequest")
                        .HasForeignKey("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.CourseCreationRequest", "NewCourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dossier");

                    b.Navigation("NewCourse");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.CourseModificationRequest", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.Course", "Course")
                        .WithOne("CourseModificationRequest")
                        .HasForeignKey("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.CourseModificationRequest", "CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.Dossier", "Dossier")
                        .WithMany("CourseModificationRequests")
                        .HasForeignKey("DossierId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("Dossier");
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

            modelBuilder.Entity("GroupUser", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Users.Group", null)
                        .WithMany()
                        .HasForeignKey("GroupsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConcordiaCurriculumManager.Models.Users.User", null)
                        .WithMany()
                        .HasForeignKey("MembersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GroupUser1", b =>
                {
                    b.HasOne("ConcordiaCurriculumManager.Models.Users.User", null)
                        .WithMany()
                        .HasForeignKey("GroupMastersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConcordiaCurriculumManager.Models.Users.Group", null)
                        .WithMany()
                        .HasForeignKey("MasteredGroupsId")
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
                    b.Navigation("CourseCreationRequest");

                    b.Navigation("CourseModificationRequest");

                    b.Navigation("CourseReferenced");

                    b.Navigation("CourseReferencing");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Curriculum.Dossiers.Dossier", b =>
                {
                    b.Navigation("CourseCreationRequests");

                    b.Navigation("CourseModificationRequests");
                });

            modelBuilder.Entity("ConcordiaCurriculumManager.Models.Users.User", b =>
                {
                    b.Navigation("Dossiers");
                });
#pragma warning restore 612, 618
        }
    }
}
