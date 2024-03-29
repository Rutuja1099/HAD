package com.example.had_backend_jwt.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class RandomPasswordGenerationService {
    private static final String charLower = "abcdefghijklmnopqrstuvwxyz";
    private static final String charUpper = charLower.toUpperCase();
    private static final String number = "0123456789";
    private static final String otherChar = "!@#$%&*()_+-=[]?";
    public String randomPasswordGeneration(){
        final String passwordBase = charLower+ charUpper + number + otherChar;
        final SecureRandom random = new SecureRandom();

        StringBuilder password = new StringBuilder(12);
        password.append(randomChar(charLower));
        password.append(randomChar(charUpper));
        password.append(randomChar(number));
        password.append(randomChar(otherChar));

        for (int i = 4; i < 12; i++) {
            password.append(randomChar(passwordBase));
        }

        return password.toString();
    }

    private static char randomChar(String inputString) {
        Random random=new Random();
        int randomIndex = random.nextInt(inputString.length());
        return inputString.charAt(randomIndex);
    }
}
