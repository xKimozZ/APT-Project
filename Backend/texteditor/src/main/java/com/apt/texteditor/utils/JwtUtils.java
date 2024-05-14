package com.apt.texteditor.utils;

import com.apt.texteditor.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtils {

    private static final String SECRET_KEY = "HowComeIMustKnowWhereObsessionNeedsToGoHowComeIMustKnowWhereThePassionHidesItsFeelings";

    public static String generateToken(User user, long time) {
        System.out.println("hello");        // Set token expiration time
        long expirationTimeMs = System.currentTimeMillis() + (time * 1000);

        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(user.getUsername()) // Set subject to username
                .setExpiration(new Date(expirationTimeMs))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY);

        return jwtBuilder.compact();
    }

    public static Claims decodeToken(String token) {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            // Token validation failed
            return null;
        }
    }
}
