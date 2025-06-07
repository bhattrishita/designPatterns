package com.expensetracker_backend.expensetracker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String password;
    private String profilePic;

    // Add other fields as necessary (password, phone, etc.)

    // Private constructor for builder
    private User(UserBuilder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.phone = builder.phone;
        this.password = builder.password;
        this.profilePic = builder.profilePic;
    }

    // Static nested builder class
    public static class UserBuilder {
        private String name;
        private String email;
        private String phone;
        private String password;
        private String profilePic;

        public UserBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }
        public UserBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }
        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }
        public UserBuilder profilePic(String profilePic) {
            this.profilePic = profilePic;
            return this;
        }


        public User build() {
            return new User(this);
        }
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }
}
