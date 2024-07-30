package site.petbridge.domain.contractcheck.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.petbridge.domain.contractcheck.domain.ContractCheck;
import site.petbridge.domain.contractcheck.dto.request.ContractCheckRequestDto;
import site.petbridge.domain.contractcheck.dto.response.ContractCheckResponseDto;
import site.petbridge.domain.contractcheck.repository.ContractCheckRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class ContractCheckServiceImpl implements ContractCheckService {

	private final ContractCheckRepository contractCheckRepository;

	@Override
	public ContractCheckResponseDto getDetailContractCheck(int contractId) {
		ContractCheck contractCheck = contractCheckRepository.findByContractId(contractId);
		return ContractCheckResponseDto.builder()
			.contractId(contractCheck.getContractId())
			.month1(contractCheck.getMonth1())
			.month2(contractCheck.getMonth2())
			.month3(contractCheck.getMonth3())
			.month4(contractCheck.getMonth4())
			.month5(contractCheck.getMonth5())
			.month6(contractCheck.getMonth6())
			.month7(contractCheck.getMonth7())
			.month8(contractCheck.getMonth8())
			.month9(contractCheck.getMonth9())
			.month10(contractCheck.getMonth10())
			.month11(contractCheck.getMonth11())
			.month12(contractCheck.getMonth12())
			.build();
	}

	@Override
	public int editContractCheck(int contractId, ContractCheckRequestDto contractCheckRequestDto) {
		ContractCheck contractCheck = contractCheckRepository
			.findByContractId(contractId);

		int length = contractCheckRequestDto.getMonth();
		LocalDate today = LocalDate.now();
		LocalDate[] dates = new LocalDate[]{
			contractCheck.getMonth1(), contractCheck.getMonth2(), contractCheck.getMonth3(),
			contractCheck.getMonth4(), contractCheck.getMonth5(), contractCheck.getMonth6(),
			contractCheck.getMonth7(), contractCheck.getMonth8(), contractCheck.getMonth9(),
			contractCheck.getMonth10(), contractCheck.getMonth11(), contractCheck.getMonth12()
		};

		boolean stamp = false;

		for(int i = 0; i < length; i++){
			if(dates[i] == null){
				dates[i] = today;
				stamp = true;
				break;
			}

			if(today.getYear() == dates[i].getYear() && today.getMonth() == dates[i].getMonth()){
				return 0;
			}

		}

		if(stamp){
			contractCheck.setMonth1(dates[0]);
			contractCheck.setMonth2(dates[1]);
			contractCheck.setMonth3(dates[2]);
			contractCheck.setMonth4(dates[3]);
			contractCheck.setMonth5(dates[4]);
			contractCheck.setMonth6(dates[5]);
			contractCheck.setMonth7(dates[6]);
			contractCheck.setMonth8(dates[7]);
			contractCheck.setMonth9(dates[8]);
			contractCheck.setMonth10(dates[9]);
			contractCheck.setMonth11(dates[10]);
			contractCheck.setMonth12(dates[11]);
			contractCheckRepository.save(contractCheck);
			return 1;
		}
		return 0;

	}
}
