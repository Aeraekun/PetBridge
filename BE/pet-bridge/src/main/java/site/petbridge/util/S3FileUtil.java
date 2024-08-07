package site.petbridge.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@RequiredArgsConstructor
@Log4j2
public class S3FileUtil {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3 amazonS3;

	public String saveFile(MultipartFile file, String path) throws IOException {
		if (file.isEmpty() || file.getOriginalFilename() == null) {
			return null;
		}
		String originalFilename = file.getOriginalFilename();
		String fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));

		String saveFileName = path + "/" + UUID.randomUUID().toString().substring(0, 10) + fileExtension;

		InputStream is = file.getInputStream();
		byte[] bytes = IOUtils.toByteArray(is);

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentType(file.getContentType());
		metadata.setContentLength(bytes.length);
		ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

		PutObjectRequest putObjectRequest =
			new PutObjectRequest(bucket, saveFileName, byteArrayInputStream, metadata)
				.withCannedAcl(CannedAccessControlList.PublicRead);
		amazonS3.putObject(putObjectRequest); // put image to S3

		return amazonS3.getUrl(bucket, saveFileName).toString();

	}

	public void removeFile(String path, String fileName) throws Exception {
		String key = getKeyFromImageAddress(fileName);
		amazonS3.deleteObject(new DeleteObjectRequest(bucket, key));
	}

	private String getKeyFromImageAddress(String imageAddress) throws Exception {
		URL url = new URL(imageAddress);
		String decodingKey = URLDecoder.decode(url.getPath(), StandardCharsets.UTF_8);
		return decodingKey.substring(1); // 맨 앞의 '/' 제거
	}

}
