package com.timemanual.utils;

import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;

@Component
public class ApplicationContextUtils implements ApplicationContextAware {

    private static ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
    }

    //根据bean名字获取工厂中指定bean
    public static Object getBean(String beanName){
        return context.getBean(beanName);
    }
}
