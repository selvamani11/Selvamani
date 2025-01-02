package com.example.WorkFromHome.controller;

import com.example.WorkFromHome.config.ExcelProperties;
import com.example.WorkFromHome.constants.Constants;
import com.example.WorkFromHome.entity.AssignDays;
import com.example.WorkFromHome.service.WfhService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/employee")
public class WfhController {

    private static final Logger logger = Logger.getLogger(WfhController.class.getName());
    private final WfhService wfhService;
    private final ExcelProperties excelProperties;

    private List<String> names;
    private List<String> days;
    private List<String> emails;
    private List<AssignDays> currentAssignments;

    @Autowired
    public WfhController(WfhService wfhService, ExcelProperties excelProperties) {
        this.wfhService = wfhService;
        this.excelProperties = excelProperties;
    }

    @PostConstruct
    public void init() {
        try {
            this.names = wfhService.readNamesFromExcel(excelProperties.getFilepath(), excelProperties.getSheetNames());
            this.days = wfhService.readDaysFromExcel(excelProperties.getFilepath(), excelProperties.getSheetDays());
            this.emails = wfhService.readEmailsFromExcel(excelProperties.getFilepath(), excelProperties.getSheetEmail());
            this.currentAssignments = wfhService.assignDays(names, days, emails);
        } catch (Exception e) {
            logger.log(Level.SEVERE, Constants.INIT_FAILED, e);
        }
    }

    @GetMapping("/list")
    public List<AssignDays> refreshAssignments() {
        try {
            this.currentAssignments = wfhService.assignDays(names, days, emails);
        } catch (Exception e) {
            logger.log(Level.SEVERE, Constants.REFRESH_FAILED, e);
        }
        return this.currentAssignments;
    }

    @GetMapping
    public List<AssignDays> getAssignments() {
        return this.currentAssignments;
    }
}
