package com.example.had_backend_jwt.Services;

import com.example.had_backend_jwt.Entities.DoctorInfo;
import com.example.had_backend_jwt.Entities.PatientInfo;
import com.example.had_backend_jwt.Models.DoctorListChatDTO;
import com.example.had_backend_jwt.Models.PatientListChatDTO;
import com.example.had_backend_jwt.Models.SuggestedDoctorsListResponse;
import com.example.had_backend_jwt.Repositories.DoctorInfoRepository;
import com.example.had_backend_jwt.Repositories.DoctorPatientMappingRepository;
import com.example.had_backend_jwt.Repositories.PatientInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final DoctorPatientMappingRepository doctorPatientMappingRepository;

    private final DoctorInfoRepository doctorInfoRepository;

    private final PatientInfoRepository patientInfoRepository;

    public List<DoctorListChatDTO> getDoctorsList(Integer pId){
        List<Object[]> queryResult = doctorPatientMappingRepository.DoctorsList(pId);
        List<DoctorListChatDTO> DoctorsListResponses = new ArrayList<>();

        int queryResultLength = queryResult.size();
        System.out.println("Length of queryResult: " + queryResultLength);

        for (Object[] row : queryResult) {
            Integer drId = (Integer) row[2];
            String chatId = (String) row[1];

            Optional<DoctorInfo> doctorInfo = doctorInfoRepository.findByDrId(drId);

            if (doctorInfo.isPresent()) {
                DoctorInfo doctorInfo1 = doctorInfo.get();
                String drName = doctorInfo1.getDrFullName();

                DoctorListChatDTO response = DoctorListChatDTO.builder()
                        .drId(drId)
                        .drName(chatId)
                        .ChatId(drName)
                        .build();
                DoctorsListResponses.add(response);
            }
        }
        return DoctorsListResponses;
    }



    public List<PatientListChatDTO> getPatientsList(Integer drId){
        List<Object[]> queryResult = doctorPatientMappingRepository.PatientsList(drId);
        List<PatientListChatDTO> PatientsListResponses = new ArrayList<>();

        for (Object[] row : queryResult) {
            Integer ptId = (Integer) row[0];
            String chatId = (String) row[1];

            Optional<PatientInfo> patientInfo = patientInfoRepository.findById(ptId);

            if (patientInfo.isPresent()) {
                PatientInfo patientInfo1 = patientInfo.get();
                String ptName = patientInfo1.getPtFullname();

                PatientListChatDTO response = PatientListChatDTO.builder()
                        .ptId(ptId)
                        .ChatId(chatId)
                        .ptName(ptName)
                        .build();
                PatientsListResponses.add(response);
            }
        }
        return PatientsListResponses;
    }




}
