﻿using ConcordiaCurriculumManager.Repositories.DatabaseContext;
using ConcordiaCurriculumManager.Repositories;
using Microsoft.EntityFrameworkCore;
using ConcordiaCurriculumManager.Models.Curriculum;

namespace ConcordiaCurriculumManagerTest.IntegrationTests.Repositories;

[TestClass]
public class CourseRepositoryTests
{
    private static CCMDbContext dbContext = null!;
    private ICourseRepository courseRepository = null!;

    [ClassInitialize]
    public static void ClassInitialize(TestContext _)
    {
        var options = new DbContextOptionsBuilder<CCMDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        dbContext = new CCMDbContext(options);
    }

    [TestInitialize] 
    public void TestInitialize()
    {
        courseRepository = new CourseRepository(dbContext);
    }

    [TestMethod]
    public async Task GetUniqueCourseSubjects_ReturnsCourses()
    {
        var course = new Course
        {
            Id = Guid.NewGuid(),
            CourseID = 1000,
            Subject = "SOEN",
            Catalog = "490",
            Title = "Capstone",
            Description = "Curriculum manager building simulator",
            CreditValue = "6",
            PreReqs = "SOEN 390",
            Career = CourseCareerEnum.UGRD,
            EquivalentCourses = "",
            CourseState = CourseStateEnum.NewCourseProposal,
            Version = 1,
            Published = true,
            CourseComponents = (List<CourseComponent>)ComponentCodeMapping.GetComponentCodeMapping(new ComponentCodeEnum[] { ComponentCodeEnum.LEC, ComponentCodeEnum.CON })
        };

        dbContext.Courses.Add(course);
        await dbContext.SaveChangesAsync();

        var result = await courseRepository.GetUniqueCourseSubjects();

        Assert.IsNotNull(result);
        Assert.AreEqual(result.Count(), 1);
        Assert.AreEqual(result.First(), "SOEN");
    }

    [TestMethod]
    public async Task GetMaxCourseId_ReturnsInt()
    {
        var course = new Course
        {
            Id = Guid.NewGuid(),
            CourseID = 1000,
            Subject = "SOEN",
            Catalog = "490",
            Title = "Capstone",
            Description = "Curriculum manager building simulator",
            CreditValue = "6",
            PreReqs = "SOEN 390",
            Career = CourseCareerEnum.UGRD,
            EquivalentCourses = "",
            CourseState = CourseStateEnum.NewCourseProposal,
            Version = 1,
            Published = true,
            CourseComponents = (List<CourseComponent>)ComponentCodeMapping.GetComponentCodeMapping(
                new ComponentCodeEnum[] { ComponentCodeEnum.LEC, ComponentCodeEnum.CON }
            )
        };

        dbContext.Courses.Add(course);
        await dbContext.SaveChangesAsync();

        var result = await courseRepository.GetMaxCourseId();

        Assert.IsNotNull(result);
        Assert.AreEqual(result, 1000);
    }

    [TestMethod]
    public async Task GetCourseBySubjectAndCatalog_ValidSubjectAndCatalog_ReturnsCourse()
    {
        var course = new Course
        {
            Id = Guid.NewGuid(),
            CourseID = 1000,
            Subject = "SOEN",
            Catalog = "490",
            Title = "Capstone",
            Description = "Curriculum manager building simulator",
            CreditValue = "6",
            PreReqs = "SOEN 390",
            Career = CourseCareerEnum.UGRD,
            EquivalentCourses = "",
            CourseState = CourseStateEnum.Accepted,
            Version = 1,
            Published = true,
            CourseComponents = (List<CourseComponent>)ComponentCodeMapping.GetComponentCodeMapping(
                new ComponentCodeEnum[] { ComponentCodeEnum.LEC, ComponentCodeEnum.CON }
            )
        };

        dbContext.Courses.Add(course);
        await dbContext.SaveChangesAsync();

        var result = await courseRepository.GetCourseBySubjectAndCatalog("SOEN", "490");

        Assert.IsNotNull(result);
        Assert.AreEqual(result.CourseID, course.CourseID);
    }

    [TestMethod]
    public async Task SaveCourses_ValidCourse_ReturnsTrue()
    {
        var course = new Course
        {
            Id = Guid.NewGuid(),
            CourseID = 1000,
            Subject = "SOEN",
            Catalog = "490",
            Title = "Capstone",
            Description = "Curriculum manager building simulator",
            CreditValue = "6",
            PreReqs = "SOEN 390",
            Career = CourseCareerEnum.UGRD,
            EquivalentCourses = "",
            CourseState = CourseStateEnum.Accepted,
            Version = 1,
            Published = true,
            CourseComponents = (List<CourseComponent>)ComponentCodeMapping.GetComponentCodeMapping(
        new ComponentCodeEnum[] { ComponentCodeEnum.LEC, ComponentCodeEnum.CON }
            )
        };

        var result = await courseRepository.SaveCourse(course);

        Assert.IsTrue(result);
    }

    [TestMethod]
    public async Task GetCourseByCourseId_ValidId_ReturnsCourse()
    {
        var course = new Course
        {
            Id = Guid.NewGuid(),
            CourseID = 1000,
            Subject = "SOEN",
            Catalog = "490",
            Title = "Capstone",
            Description = "Curriculum manager building simulator",
            CreditValue = "6",
            PreReqs = "SOEN 390",
            Career = CourseCareerEnum.UGRD,
            EquivalentCourses = "",
            CourseState = CourseStateEnum.Accepted,
            Version = 1,
            Published = true,
            CourseComponents = (List<CourseComponent>)ComponentCodeMapping.GetComponentCodeMapping(
        new ComponentCodeEnum[] { ComponentCodeEnum.LEC, ComponentCodeEnum.CON }
    )
        };

        dbContext.Courses.Add(course);
        await dbContext.SaveChangesAsync();

        var result = await courseRepository.GetCourseByCourseId(course.CourseID);

        Assert.IsNotNull(result);
        Assert.AreEqual(result.CourseID, course.CourseID);
    }

}