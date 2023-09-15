﻿using AutoMapper;
using ConcordiaCurriculumManager.DTO;
using ConcordiaCurriculumManager.Models;

namespace ConcordiaCurriculumManager;

public class AutoMapper : Profile
{
    public AutoMapper()
    {
        CreateMap<User, RegisterDTO>().ReverseMap();
    }

}
