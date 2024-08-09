package com.example.WorkFromHome.service;

import com.example.WorkFromHome.constants.Constants;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
public class WfhService {

    private final ResourceLoader resourceLoader;
    private List<Assignment> lastAssignments = new ArrayList<>();

    @Autowired
    public WfhService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public List<String> readNamesFromExcel(String filePath, String sheetName) {
        return readColumnFromExcel(filePath, sheetName, 0);
    }

    public List<String> readDaysFromExcel(String filePath, String sheetName) {
        return readColumnFromExcel(filePath, sheetName, 0);
    }

    public List<String> readEmailsFromExcel(String filePath, String sheetName) {
        return readColumnFromExcel(filePath, sheetName, 0); // Assuming emails are in column 1
    }

    private List<String> readColumnFromExcel(String filePath, String sheetName, int columnIndex) {
        List<String> data = new ArrayList<>();
        try (InputStream is = resourceLoader.getResource(filePath).getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheet(sheetName);
            if (sheet == null) {
                throw new IllegalArgumentException(String.format(Constants.SHEET_NOT_EXIST, sheetName));
            }
            for (Row row : sheet) {
                Cell cell = row.getCell(columnIndex);
                if (cell != null) {
                    data.add(cell.getStringCellValue());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }

    public List<Assignment> assignDays(List<String> names, List<String> days, List<String> emails) {
        if (names.isEmpty() || days.isEmpty() || emails.isEmpty()) {
            throw new IllegalArgumentException(Constants.EMPTY_LIST_ERROR);
        }

        if (names.size() != emails.size()) {
            throw new IllegalArgumentException("Names and emails lists must be of the same size.");
        }

        // Combine names and emails into a list of pairs
        List<String[]> nameEmailPairs = new ArrayList<>();
        for (int i = 0; i < names.size(); i++) {
            nameEmailPairs.add(new String[]{names.get(i), emails.get(i)});
        }

        // Shuffle the pairs
        Collections.shuffle(nameEmailPairs);

        // Separate the pairs back into individual lists
        List<String> shuffledNames = new ArrayList<>();
        List<String> shuffledEmails = new ArrayList<>();
        for (String[] pair : nameEmailPairs) {
            shuffledNames.add(pair[0]);
            shuffledEmails.add(pair[1]);
        }

        // Shuffle days independently
        List<String> shuffledDays = new ArrayList<>(days);
        Collections.shuffle(shuffledDays);

        int totalNames = shuffledNames.size();
        int totalDays = shuffledDays.size();

        int baseAssignments = totalNames / totalDays;
        int remainderAssignments = totalNames % totalDays;

        Map<String, Integer> dayAssignmentCount = new HashMap<>();
        for (String day : shuffledDays) {
            dayAssignmentCount.put(day, baseAssignments);
        }

        for (int i = 0; i < remainderAssignments; i++) {
            dayAssignmentCount.put(shuffledDays.get(i), dayAssignmentCount.get(shuffledDays.get(i)) + 1);
        }

        // Flatten the map to a list of day assignments
        List<String> flattenedDayAssignments = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : dayAssignmentCount.entrySet()) {
            for (int i = 0; i < entry.getValue(); i++) {
                flattenedDayAssignments.add(entry.getKey());
            }
        }

        // Shuffle the final day assignments to ensure randomness
        Collections.shuffle(flattenedDayAssignments);

        int nameIndex = 0;
        List<Assignment> newAssignments = new ArrayList<>();
        for (String day : flattenedDayAssignments) {
            String name = shuffledNames.get(nameIndex);
            String email = shuffledEmails.get(nameIndex);
            newAssignments.add(new Assignment(name, email, day));
            nameIndex++;
        }

        lastAssignments = new ArrayList<>(newAssignments);
        return newAssignments;
    }

    public List<Assignment> getLastAssignments() {
        return lastAssignments;
    }

    public static class Assignment {
        private String name;
        private String email;
        private String days;

        public Assignment(String name, String email, String days) {
            this.name = name;
            this.email = email;
            this.days = days;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public String getDays() {
            return days;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setDays(String days) {
            this.days = days;
        }
    }
}
