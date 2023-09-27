﻿using System.Text.Json;

namespace ConcordiaCurriculumManager.Models;

public class User: BaseModel
{
    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }

    public List<Role> Roles { get; set; } = new();

    public List<Group> Groups { get; set; } = new();

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}
