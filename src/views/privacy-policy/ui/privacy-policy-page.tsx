function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-sm leading-relaxed text-gray-800">
      <h1 className="mb-2 text-2xl font-bold">개인정보 처리방침</h1>
      <p className="mb-8 text-gray-500">시행일: 2026년 2월 25일</p>

      <p className="mb-8">
        <strong>모꼬지</strong>(
        <a
          href="https://www.mokkoji.site/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 underline"
        >
          https://www.mokkoji.site/
        </a>
        , 이하 &ldquo;회사&rdquo;)는 「개인정보 보호법」 제30조에 따라 이용자의
        개인정보를 보호하고 관련 고충을 원활히 처리하기 위해 다음과 같이
        개인정보 처리방침을 수립하고 공개합니다.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제1조 (개인정보의 처리 목적)
        </h2>
        <p className="mb-3">
          회사는 아래 목적으로 개인정보를 처리합니다. 수집된 개인정보는 명시된
          목적 외의 용도로 이용하지 않으며, 목적이 변경될 경우 「개인정보
          보호법」 제18조에 따라 사전에 동의를 받겠습니다.
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>회원 가입 및 관리</strong>: 이용자 식별 및 인증, 회원 자격
            유지·관리, 서비스 부정이용 방지
          </li>
          <li>
            <strong>서비스 제공</strong>: 세종대학교 동아리 정보 및 모집 공고
            콘텐츠 제공
          </li>
          <li>
            <strong>광고성 정보 전송</strong> (이메일 제공 및 별도 동의자에
            한함): 신규 서비스 및 이벤트 안내, 동아리 모집 알림 등
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제2조 (개인정보의 보유 및 이용 기간)
        </h2>
        <p className="mb-3">
          회사는 법령에서 정한 기간 또는 이용자로부터 동의받은 기간 동안
          개인정보를 보유합니다.
        </p>
        <table className="mb-3 w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                처리 목적
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                보유 기간
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                회원 가입 및 관리
              </td>
              <td className="border border-gray-300 px-4 py-2">
                회원 탈퇴 시까지
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">서비스 제공</td>
              <td className="border border-gray-300 px-4 py-2">
                회원 탈퇴 시까지
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                광고성 정보 전송
              </td>
              <td className="border border-gray-300 px-4 py-2">
                수신 동의 철회 시까지
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          단, 관계 법령에 보존 의무가 있는 경우 해당 기간 동안 별도 보관합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제3조 (처리하는 개인정보의 항목)
        </h2>
        <p className="mb-3">
          회사는 회원 가입 및 서비스 이용을 위해 아래 개인정보를 수집합니다.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>필수</strong>: 학번, 이름, 학과, 학년
          </li>
          <li>
            <strong>선택</strong>: 이메일 (광고성 정보 수신 동의 시 활용)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제4조 (개인정보의 파기)
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            보유 기간이 만료되거나 처리 목적이 달성된 개인정보는 지체 없이
            파기합니다.
          </li>
          <li>
            전자적으로 저장된 개인정보는 복구 불가능한 방식으로 완전 삭제하며,
            종이로 출력된 경우 분쇄 또는 소각하여 파기합니다.
          </li>
          <li>
            법령에 따라 보존이 필요한 경우 해당 기간 동안 별도로 안전하게
            보관합니다.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제5조 (개인정보 처리 업무의 위탁)
        </h2>
        <p className="mb-3">
          ① 회사는 원활한 서비스 운영을 위해 아래와 같이 개인정보 처리 업무를
          위탁합니다.
        </p>
        <table className="mb-3 w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                수탁자
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                위탁 업무
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                Amazon Web Services, Inc. (AWS)
              </td>
              <td className="border border-gray-300 px-4 py-2">
                서버 호스팅 및 데이터 보관
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          ② 회사는 위탁 계약 시 「개인정보 보호법」 제26조에 따라 수탁자가
          개인정보를 안전하게 처리하도록 필요한 사항을 규정하고 이를
          관리·감독합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제6조 (개인정보의 국외 이전)
        </h2>
        <p className="mb-3">
          ① 회사는 서비스 운영을 위해 아래와 같이 개인정보를 국외로 이전합니다.
        </p>
        <table className="mb-3 w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                항목
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                내용
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['이전 국가', '미국'],
              ['이전받는 자', 'Amazon Web Services, Inc.'],
              ['이전 목적', '서버 운영 및 데이터 보관'],
              ['이전 항목', '학번, 이름, 학과, 학년, 이메일(선택 제공 시)'],
              ['보유 기간', '회원 탈퇴 시까지'],
            ].map(([label, value]) => (
              <tr key={label}>
                <td className="border border-gray-300 px-4 py-2">{label}</td>
                <td className="border border-gray-300 px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          ② 이용자는 개인정보의 국외 이전을 거부할 수 있으며, 거부 시 서비스
          이용이 제한될 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제7조 (정보주체의 권리와 행사 방법)
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            이용자는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지를
            요청할 수 있습니다.
          </li>
          <li>
            요청은 아래 제9조의 개인정보 보호책임자에게 이메일로 할 수 있으며,
            회사는 지체 없이 처리합니다.
          </li>
          <li>
            만 14세 미만 아동의 법정대리인도 동일한 방법으로 권리를 행사할 수
            있습니다.
          </li>
          <li>관련 법령에 따라 권리 행사가 제한될 수 있습니다.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제8조 (개인정보의 안전성 확보 조치)
        </h2>
        <p className="mb-3">
          회사는 이용자의 개인정보를 안전하게 보호하기 위해 다음 조치를
          시행합니다.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>HTTPS 암호화 통신 적용</li>
          <li>개인정보 접근 권한 최소화 및 관리</li>
          <li>접속 기록 1년 이상 보관</li>
          <li>서버 방화벽 및 보안 정책 적용</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제9조 (개인정보 보호책임자)
        </h2>
        <p className="mb-3">
          이용자의 개인정보 관련 문의, 불만, 권리 행사 등에 관한 사항은 아래
          담당자에게 연락하시기 바랍니다.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>성명</strong>: 신혜빈
          </li>
          <li>
            <strong>직책</strong>: 대표
          </li>
          <li>
            <strong>이메일</strong>:{' '}
            <a
              href="mailto:sejongmokkojidev@gmail.com"
              className="text-primary-500 underline"
            >
              sejongmokkojidev@gmail.com
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제10조 (권익 침해에 대한 구제 방법)
        </h2>
        <p className="mb-3">
          개인정보 침해로 인한 피해를 구제받기 위해 아래 기관에 도움을 요청할 수
          있습니다.
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                기관
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                연락처
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['개인정보분쟁조정위원회', '1833-6972'],
              ['개인정보침해신고센터', '118'],
              ['대검찰청', '1301'],
              ['경찰청', '182'],
            ].map(([org, tel]) => (
              <tr key={org}>
                <td className="border border-gray-300 px-4 py-2">{org}</td>
                <td className="border border-gray-300 px-4 py-2">{tel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold">
          제11조 (개인정보 처리방침의 변경)
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>본 방침은 2026년 2월 25일부터 시행됩니다.</li>
          <li>
            방침을 변경하는 경우 최소 7일 전에 서비스 공지사항을 통해
            안내합니다. 이용자의 권리·의무에 중대한 영향을 미치는 변경의 경우
            최소 30일 전에 공지합니다.
          </li>
        </ol>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
