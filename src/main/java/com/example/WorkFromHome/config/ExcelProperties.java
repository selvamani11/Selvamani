package com.example.WorkFromHome.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ExcelProperties {

    @Value("${excel.filepath}")
    private String filepath;

    @Value("${excel.sheetNames}")
    private String sheetNames;

    @Value("${excel.sheetDays}")
    private String sheetDays;

    @Value("${excel.sheetEmail}")
    private String sheetEmail;

    public String getFilepath() {
        return filepath;
    }

    public String getSheetNames() {
        return sheetNames;
    }

    public String getSheetDays() {
        return sheetDays;
    }

    public String getSheetEmail() {
        return sheetEmail;
    }
}
