package com.timemanual.utils;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class SaltUtils {
    //生成salt
    public static String getSalt(int n){
        String str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789~!@#$%^&*";
        char[] chars = str.toCharArray();
        StringBuilder salt = new StringBuilder();
        for (int i = 0; i < n; i++) {
            char aChar = chars[new Random().nextInt(chars.length)];
            salt.append(aChar);
        }
        return salt.toString();
    }

}
