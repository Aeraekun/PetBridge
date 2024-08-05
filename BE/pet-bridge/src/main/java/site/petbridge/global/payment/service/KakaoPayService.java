package site.petbridge.global.payment.service;

import org.springframework.http.HttpHeaders;

import site.petbridge.global.payment.dto.response.ApproveResponseDto;
import site.petbridge.global.payment.dto.response.ReadyResponseDto;

public interface KakaoPayService {

    ReadyResponseDto payReady(String name, int totalPrice);

    ApproveResponseDto payApprove(String tid, String pgToken);

    HttpHeaders getHeaders();

}
