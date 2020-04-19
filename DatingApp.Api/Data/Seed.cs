using System;
using System.Collections.Generic;
using System.Linq;
using DatingApp.Api.Models;
using Newtonsoft.Json;

namespace DatingApp.Api.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context) {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/Users.Seed.json");
                Console.WriteLine("data: " + userData.Length.ToString());
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                 Console.WriteLine("Deserialize users: " + users.LongCount().ToString());
                foreach (var user in users)
                {
                     byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);                    
                }
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}