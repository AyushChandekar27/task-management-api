package com.taskmanager.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("admin".equals(username)) {
            return new org.springframework.security.core.userdetails.User(
                    "admin",
                    "admin123",
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
        }
        throw new UsernameNotFoundException("User not found: " + username);
    }
}