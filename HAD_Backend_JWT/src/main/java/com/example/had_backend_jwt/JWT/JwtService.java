package com.example.had_backend_jwt.JWT;

import com.example.had_backend_jwt.Entities.AdminLogin;
import com.example.had_backend_jwt.Entities.DoctorLogin;
import com.example.had_backend_jwt.Entities.PatientLogin;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    public String extractUserName(String token) {

        return extractClaim(token,Claims::getSubject);
    }

    public Integer extractId(HttpServletRequest req, String idAttribute){
        String token= resolveToken(req);
        if(token!=null){
            Claims claims=extractAllClaims(token);
            return (int)claims.get(idAttribute);
        }
        return -1;
    }

    public String extractRole(String token){
        Claims claims=extractAllClaims(token);
        return (String) claims.get("role");
    }
    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims=extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

//    public String generateToken(PatientLogin patientLogin){
//
//        return generateToken(new HashMap<>(), patientLogin);
//    }

    public String generateToken(PatientLogin patientLogin){
        Map<String, Object> claims = new HashMap<>();
        claims.put("patientId", patientLogin.getPtRegNo());
        claims.put("role","Patient");
        return generateToken(claims, patientLogin);
    }

    public String generateToken(Map<String,Object> extraClaims,PatientLogin patientLogin){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(patientLogin.getPtUsername()) // ptUsername is the username field in PatientLogin
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration)) // Use jwtExpiration variable
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(DoctorLogin doctorLogin){
        Map<String, Object> claims = new HashMap<>();
        claims.put("doctorId", doctorLogin.getDrId()); // Assuming getId() returns the ID of the patient
        claims.put("role","Doctor");
        return generateToken(claims, doctorLogin);
    }

    public String generateToken(Map<String,Object> extraClaims, DoctorLogin doctorLogin){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(doctorLogin.getDrUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration)) // Use jwtExpiration variable
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(AdminLogin adminLogin){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role","Admin");
        return generateToken(claims, adminLogin);
    }

    public String generateToken(Map<String,Object> extraClaims, AdminLogin adminLogin){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(adminLogin.getAdminUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration)) // Use jwtExpiration variable
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username=extractUserName(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {

        return extractClaim(token,Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes= Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //Resolve token from HttpServletRequest
    private String resolveToken(HttpServletRequest req){
        String token=req.getHeader("Authorization");
        if(token!=null && token.startsWith("Bearer ")){
            return token.substring(7);
        }
        return null;
    }

    // This set stores invalidated tokens
    private Set<String> blacklist = new HashSet<>();

    // Method to add token to the blacklist
    public void addToBlacklist(HttpServletRequest request) {
        String token=resolveToken(request);
        blacklist.add(token);
    }

    // Method to check if a token is blacklisted
    public boolean isTokenBlacklisted(String token) {
        return blacklist.contains(token);
    }

}
