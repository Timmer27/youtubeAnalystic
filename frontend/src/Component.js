/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G0MaaL8SWAR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { button } from "@/components/ui/button"
// import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table"
// import { input } from "@/components/ui/input"

import { Button, Input } from "antd";

export default function Component() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen w-[100%]">
      <main className="p-4">
        <section className="mb-8 w-[50%]">
          <div className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center space-x-2">
              <div className="text-lg font-bold">블로그 주소</div>
              <Input className="text-sm" />
            </div>
            <Button >확인</Button>
          </div>
        </section>
        <section className="mb-8">
          <div className="flex items-center justify-between p-4 bg-white">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-lg font-bold">블로그 지수</div>
                <InfoIcon className="h-4 w-4 text-[#6c757d]" />
              </div>
              <button className="bg-[#007bff] text-white">Level 4</button>
              <div className="flex items-center justify-between">
                <div className="text-sm">오늘 방문자</div>
                <div className="text-sm font-bold">29</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-bold">안테나 미션</div>
              <div className="flex items-center justify-between">
                <div className="text-sm">오늘 방문자</div>
                <div className="text-sm font-bold">29</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">전체 방문자</div>
                <div className="text-sm font-bold">43,737</div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                alt="Advertisement"
                className="aspect-[2/1]"
                height="100"
                src="/placeholder.svg"
                width="200"
              />
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center space-x-2">
              <FlameIcon className="h-6 w-6 text-[#dc3545]" />
              <div className="text-lg font-bold">최근 포스트</div>
            </div>
            <button className="bg-[#007bff] text-white">더 보기</button>
          </div>
          {/* <div className="bg-white">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1개월 전</TableCell>
                  <TableCell>
                    [솔리드원칙] 첫번째, 단일책임원칙, 그리고 스프링프레임워크를 통한 패턴과 원칙 파헤치는 솔리드원칙
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">1개월 전</TableCell>
                  <TableCell>이 한달한 체험 사서, 악기까지 적극적으로 해볼만한 이유 - 비즈니스 셀프 출판</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">1개월 전</TableCell>
                  <TableCell>
                    [솔리드원칙] 객체지향의 자유 2탄 블로그 포스팅 어렵지 않은데 왜? 모두 SNS 1000만명 데뷔
                    도전중소프트웨어라치지 않아도 된다
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div> */}
        </section>
        <section>
          <div className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center space-x-2">
              <BarChartIcon className="h-6 w-6 text-[#dc3545]" />
              <div className="text-lg font-bold">지수</div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-[#007bff] text-white">대표 공감</button>
              <button className="bg-[#007bff] text-white">사진</button>
              <button className="bg-[#007bff] text-white">생활</button>
            </div>
            <div className="flex items-center space-x-2">
              <input placeholder="Search" />
              <button className="bg-[#007bff] text-white">
                <SearchIcon className="text-white" />
              </button>
            </div>
          </div>
          {/* <div className="bg-white">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">0.93</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>22</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>
                    <button className="bg-[#007bff] text-white">Q</button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">0.49</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>26</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <button className="bg-[#007bff] text-white">Q</button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">0.84</TableCell>
                  <TableCell>13</TableCell>
                  <TableCell>35</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>
                    <button className="bg-[#007bff] text-white">Q</button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div> */}
        </section>
      </main>
    </div>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
