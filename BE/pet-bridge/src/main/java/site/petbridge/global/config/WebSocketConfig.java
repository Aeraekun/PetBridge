package site.petbridge.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		System.out.println("configureMessageBroker로 소켓 연결");
		config.enableSimpleBroker("/topic", "/chat-room"); // 브로커에서 사용할 경로 설정
		config.setApplicationDestinationPrefixes("/chat"); // 애플리케이션 내부에서 사용하는 경로 프리픽스
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		System.out.println("registerStompEndpoints로 소켓 연결");
		registry.addEndpoint("/friendChat")
			.setAllowedOrigins("http://localhost:3000", "http://localhost:8080", "null") // 올바른 출처 설정
			.withSockJS();
	}
}