import { test } from "@playwright/test";
import { payments } from "./data/paymentData";
import { SUCCESS, FAILED, PENDING } from "./config/constant";

test.describe("Lesson 04", () => {

    test("Bài 1. Báo cáo thống kê giao dịch ⭐⭐⭐⭐", async () => {
        /*Sử dụng for…of kết hợp if/else để thống kê:
            Tổng số giao dịch
            Số giao dịch SUCCESS
            Số giao dịch FAILED
            Số giao dịch PENDING
            Tổng tiền của các giao dịch SUCCESS
            Tổng tiền của các giao dịch FAILED */

        let countSuccess: number = 0;
        let countFailed: number = 0;
        let countPending: number = 0;
        let totalSuccess: number = 0;
        let totalFailed: number = 0;
        let totalTranx: number = 0;

        for (const payment of payments) {
            //count total tranx
            totalTranx++;
            //check status and count and sum amount
            if (payment.status === SUCCESS) {
                countSuccess++;
                totalSuccess += payment.amount;
            } else if (payment.status === FAILED) {
                countFailed++;
                totalFailed += payment.amount;
            } else if (payment.status === PENDING) {
                countPending++;
            }
        }
        //print report
        console.log(`========== PAYMENT REPORT ==========
        Total Transaction : ${totalTranx}

        SUCCESS : ${countSuccess}
        FAILED  : ${countFailed}
        PENDING : ${countPending}

        Total Success Amount : ${totalSuccess}
        Total Failed Amount  : ${totalFailed}
        ====================================`);
    });

    test("Bài 2. Phân loại giá trị giao dịch ⭐⭐⭐⭐⭐", async () => {

        //loop through payments
        for (const payment of payments) {
            let tranxType: string;
            //check status is success
            if (payment.status === SUCCESS) {
                //check amount and classify
                if (payment.amount < 500000) {
                    tranxType = "SMALL";
                } else if (payment.amount < 2000000) {
                    tranxType = "MEDIUM";
                } else {
                    tranxType = "LARGE";
                }
            } else {
                tranxType = "INVALID STATUS";
            }
            console.log(`${payment.transactionId} -> ${tranxType}`);
        }

    });

    test("Bài 3. Phát hiện giao dịch đáng ngờ ⭐⭐⭐⭐⭐", async () => {
        let totalSuspiciousTranx: number = 0;
        for (const payment of payments) {
            if (payment.amount > 2000000 && payment.currency === "USD" && payment.status === SUCCESS) {
                totalSuspiciousTranx++;
                const lines = [
                    `⚠ Suspicious Transaction`,
                    ``,
                    `ID : ${payment.transactionId}`,
                    `Customer : ${payment.customer}`,
                    `Amount : ${payment.amount} ${payment.currency}`,
                ];
                console.log(lines.join('\n'));
            }
        }
        console.log(`\nTotal Suspicious Transaction : ${totalSuspiciousTranx}`);

    });

    test("Bài 4. Báo cáo theo phương thức thanh toán", async () => {
        let visaCountFailed: number = 0;
        let visaCountSuccess: number = 0;
        let visaCountPending: number = 0;
        let masterCountFailed: number = 0;
        let masterCountSuccess: number = 0;
        let masterCountPending: number = 0;
        let qrCountFailed: number = 0;
        let qrCountSuccess: number = 0;
        let qrCountPending: number = 0;
        //loop through payments
        for (const payment of payments) {
            //check method
            if (payment.paymentMethod === "VISA") {
                //Check status
                if (payment.status === SUCCESS) {
                    visaCountSuccess++;
                } else if (payment.status === FAILED) {
                    visaCountFailed++;
                }
                else if (payment.status === PENDING) {
                    visaCountPending++;
                }
            } else if (payment.paymentMethod === "MASTER") {
                if (payment.status === SUCCESS) {
                    masterCountSuccess++;
                } else if (payment.status === FAILED) {
                    masterCountFailed++;
                } else if (payment.status === PENDING) {
                    masterCountPending++;
                }
            } else if (payment.paymentMethod === "QR") {
                if (payment.status === SUCCESS) {
                    qrCountSuccess++;
                } else if (payment.status === FAILED) {
                    qrCountFailed++;
                } else if (payment.status === PENDING) {
                    qrCountPending++;
                }
            }
        }
        console.log(`
        PAYMENT REPORT BY PAYMENT METHOD
        ===================================================

        --- VISA ---
        SUCCESS : ${visaCountSuccess}
        FAILED  : ${visaCountFailed}
        PENDING : ${visaCountPending}

        --- MASTER ---
        SUCCESS : ${masterCountSuccess}
        FAILED  : ${masterCountFailed}
        PENDING : ${masterCountPending}

        --- QR ---
        SUCCESS : ${qrCountSuccess}
        FAILED  : ${qrCountFailed}
        PENDING : ${qrCountPending}

        ===================================================`);


    });

    test("Bài 5.Mô phỏng hệ thống Automation Test ⭐⭐⭐⭐⭐", async () => {
        let countSucess: number = 0;
        let countFailed: number = 0;
        let countPending: number = 0;
        //loop through payments
        for (const payment of payments) {
            let result: string = "";
            //check status
            if (payment.status === SUCCESS) {
                countSucess++;
                result = "PASS";
            } else if (payment.status === FAILED) {
                countFailed++;
                result = "FAIL";
            } else if (payment.status === PENDING) {
                countPending++;
                result = "SKIP";
            }
            console.log(`${payment.transactionId} -> ${result}`);
        }
        console.log(`========== TEST SUMMARY ==========
        Total PASS : ${countSucess}
        Total FAIL : ${countFailed}
        Total SKIP : ${countPending}`);

        if (countFailed = 0) {
            console.log("TEST RESULT : PASSED");
        } else {
            console.log("TEST RESULT : FAILED");
        }
    })

    test("Bài 7. Kiểm tra dữ liệu đầu vào ⭐⭐⭐⭐⭐", async () => {
        for (const payment of payments) {
            if (payment.transactionId === "" && payment.amount <= 0 && payment.customer === "") {
                console.log(`Invalid Data
            ${payment.transactionId}
            Reason
            - Amount <= 0
            - Empty Customer`);
            }
            else {
                console.log(`${payment.transactionId} -> Valid`);
            }
        }
    })

    test("Bài 8. Dashboard tổng hợp ⭐⭐⭐⭐⭐⭐", async () => {
        let totalTranx: number = 0;
        let totalSuccess: number = 0;
        let totalFailed: number = 0;
        let totalPending: number = 0;
        let visaSuccess: number = 0;
        let visaFailed: number = 0;
        let visaPending: number = 0;
        let masterSuccess: number = 0;
        let masterFailed: number = 0;
        let masterPending: number = 0;
        let qrSuccess: number = 0;
        let qrFailed: number = 0;
        let qrPending: number = 0;
        let totalSuspiciousTranx: number = 0;
        let totalSuccessAmount: number = 0;
        let totalFailedAmount: number = 0;
        let totalLargeTranx: number = 0;
        let totalSmallTranx: number = 0;
        //loop through payments
        for (const payment of payments) {
            totalTranx++;
            //check status
            if (payment.status === SUCCESS) {
                totalSuccess++;
                totalSuccessAmount += payment.amount;
            } else if (payment.status === FAILED) {
                totalFailed++;
                totalFailedAmount += payment.amount;
            } else if (payment.status === PENDING) {
                totalPending++;
            }
            //check payment method
            if (payment.paymentMethod === "VISA") {
                if (payment.status === SUCCESS) {
                    visaSuccess++;
                } else if (payment.status === FAILED) {
                    visaFailed++;
                } else if (payment.status === PENDING) {
                    visaPending++;
                }
            } else if (payment.paymentMethod === "MASTER") {
                if (payment.status === SUCCESS) {
                    masterSuccess++;
                } else if (payment.status === FAILED) {
                    masterFailed++;
                } else if (payment.status === PENDING) {
                    masterPending++;
                }
            } else if (payment.paymentMethod === "QR") {
                if (payment.status === SUCCESS) {
                    qrSuccess++;
                } else if (payment.status === FAILED) {
                    qrFailed++;
                } else if (payment.status === PENDING) {
                    qrPending++;
                }
            }
            //check suspicious tranx
            if (payment.amount > 2000000 && payment.currency === "USD" && payment.status === SUCCESS) {
                totalSuspiciousTranx++;
            }

            //classify transaction size
            if (payment.amount > 2000000) {
                totalLargeTranx++;
            } else if (payment.amount < 500000) {
                totalSmallTranx++;
            }

        }
        console.log(`=============================
        PAYMENT DASHBOARD
        =============================

        Total Transaction : ${totalTranx}

        SUCCESS : ${totalSuccess}
        FAILED : ${totalFailed}
        PENDING : ${totalPending}

        Total SUCCESS Amount : ${totalSuccessAmount}

        Total FAILED Amount : ${totalFailedAmount}

        VISA
        SUCCESS : ${visaSuccess}
        FAILED : ${visaFailed}
        PENDING : ${visaPending}

        MASTER
        SUCCESS : ${masterSuccess}
        FAILED : ${masterFailed}
        PENDING : ${masterPending}

        QR
        SUCCESS : ${qrSuccess}
        FAILED : ${qrFailed}
        PENDING : ${qrPending}

        Suspicious Transaction : ${totalSuspiciousTranx}

        Large Transaction : ${totalLargeTranx}

        Small Transaction : ${totalSmallTranx}

        =============================`
        );
    })

    test("Bài 8 tối ưu code bớt biến đếm, không dùng nhiều if else", async () => {
        let totalTranx = 0;
        let totalSuccessAmount = 0;
        let totalFailedAmount = 0;
        let totalSuspiciousTranx = 0;
        let totalLargeTranx = 0;
        let totalSmallTranx = 0;

        const statusCount = { SUCCESS: 0, FAILED: 0, PENDING: 0 };

        const methodCount = {
            VISA: { SUCCESS: 0, FAILED: 0, PENDING: 0 },
            MASTER: { SUCCESS: 0, FAILED: 0, PENDING: 0 },
            QR: { SUCCESS: 0, FAILED: 0, PENDING: 0 },
        };

        for (const payment of payments) {
            totalTranx++;
            //đếm theo status
            statusCount[payment.status]++;
            //đếm theo payment method + status (không cần if/else)
            methodCount[payment.paymentMethod][payment.status]++;

            // cộng dồn amount theo status
            if (payment.status === SUCCESS) {
                totalSuccessAmount += payment.amount;
            } else if (payment.status === FAILED) {
                totalFailedAmount += payment.amount;
            }

            // phân loại giao dịch
            if (payment.amount > 2000000) {
                totalLargeTranx++;
            } else if (payment.amount < 500000) {
                totalSmallTranx++;
            }

            // giao dịch đáng ngờ (tái sử dụng isLarge, không tính lại)
            if (payment.amount > 2000000 && payment.currency === "USD" && payment.status === SUCCESS) {
                totalSuspiciousTranx++;
            }


        }
        console.log(`   =============================
            PAYMENT DASHBOARD
        =============================

        Total Transaction : ${totalTranx}

        SUCCESS : ${statusCount.SUCCESS}
        FAILED : ${statusCount.FAILED}
        PENDING : ${statusCount.PENDING}

        Total SUCCESS Amount : ${totalSuccessAmount}
        Total FAILED Amount : ${totalFailedAmount}

        VISA
        SUCCESS : ${methodCount.VISA.SUCCESS}
        FAILED : ${methodCount.VISA.FAILED}
        PENDING : ${methodCount.VISA.PENDING}

        MASTER
        SUCCESS : ${methodCount.MASTER.SUCCESS}
        FAILED : ${methodCount.MASTER.FAILED}
        PENDING : ${methodCount.MASTER.PENDING}

        QR
        SUCCESS : ${methodCount.QR.SUCCESS}
        FAILED : ${methodCount.QR.FAILED}
        PENDING : ${methodCount.QR.PENDING}

        Suspicious Transaction : ${totalSuspiciousTranx}
        Large Transaction : ${totalLargeTranx}
        Small Transaction : ${totalSmallTranx}
        =============================`);
    });

    test("Bonus Challenge", async () => {
        const totalSuccess: number = payments.filter((item) => item.status === SUCCESS).length;
        const totalFailed: number = payments.filter((item) => item.status === FAILED).length;
        const totalPending: number = payments.filter((item) => item.status === PENDING).length;
        const totalTranx: number = payments.length;
        const visaSuccess: number = payments.filter((item) => item.paymentMethod === "VISA" && item.status === SUCCESS).length;
        const visaFailed: number = payments.filter((item) => item.paymentMethod === "VISA" && item.status === FAILED).length;
        const visaPending: number = payments.filter((item) => item.paymentMethod === "VISA" && item.status === PENDING).length;
        const masterSuccess: number = payments.filter((item) => item.paymentMethod === "MASTER" && item.status === SUCCESS).length;
        const masterFailed: number = payments.filter((item) => item.paymentMethod === "MASTER" && item.status === FAILED).length;
        const masterPending: number = payments.filter((item) => item.paymentMethod === "MASTER" && item.status === PENDING).length;
        const qrSuccess: number = payments.filter((item) => item.paymentMethod === "QR" && item.status === SUCCESS).length;
        const qrFailed: number = payments.filter((item) => item.paymentMethod === "QR" && item.status === FAILED).length;
        const qrPending: number = payments.filter((item) => item.paymentMethod === "QR" && item.status === PENDING).length;
        const totalSuspiciousTranx: number = payments.filter((item) => item.amount > 2000000 && item.currency === "USD" && item.status === SUCCESS).length;
        const totalSuccessAmount: number = payments.filter((item) => item.status === SUCCESS).reduce((acc, item) => acc + item.amount, 0);
        const totalFailedAmount: number = payments.filter((item) => item.status === FAILED).reduce((acc, item) => acc + item.amount, 0);
        const totalLargeTranx: number = payments.filter((item) => item.amount > 2000000).length;
        const totalSmallTranx: number = payments.filter((item) => item.amount < 500000).length;

        console.log(`=============================
        PAYMENT DASHBOARD
        =============================

        Total Transaction : ${totalTranx}

        SUCCESS : ${totalSuccess}
        FAILED : ${totalFailed}
        PENDING : ${totalPending}

        Total SUCCESS Amount : ${totalSuccessAmount}

        Total FAILED Amount : ${totalFailedAmount}

        VISA
        SUCCESS : ${visaSuccess}
        FAILED : ${visaFailed}
        PENDING : ${visaPending}

        MASTER
        SUCCESS : ${masterSuccess}
        FAILED : ${masterFailed}
        PENDING : ${masterPending}

        QR
        SUCCESS : ${qrSuccess}
        FAILED : ${qrFailed}
        PENDING : ${qrPending}

        Suspicious Transaction : ${totalSuspiciousTranx}

        Large Transaction : ${totalLargeTranx}

        Small Transaction : ${totalSmallTranx}

        =============================`
        );
    })

    /* 
        # So sánh chi tiết 2 cách xử lý

        ## 1. Số dòng code

        | Tiêu chí | Cách 1 (for...of) | Cách 2 (filter) |
        | :--- | :--- | :--- |
        | **Phần khai báo + tính toán** | ~55 dòng (18 biến `let` + logic trong 1 vòng loop) | ~17 dòng (mỗi dòng 1 phép filter, gọn hơn nhiều) |
        | **Tổng thể** *(không tính console.log)* | Dài hơn | Ngắn hơn đáng kể (~1/3) |

        > 📊 **Kết luận:** **Cách 2 ít hơn** về số dòng, vì mỗi dòng `filter` tự chứa toàn bộ logic của nó, không cần biến trung gian `tranType`, không cần `if/else`.

        ## 2. Độ dễ đọc

        | Tiêu chí | Cách 1 (for...of) | Cách 2 (filter) |
        | :--- | :--- | :--- |
        | **Đọc từng dòng riêng lẻ** | Phải đọc cả vòng loop mới hiểu 1 biến được tính thế nào | Đọc 1 dòng là hiểu ngay biến đó nghĩa là gì (khai báo = công thức) |
        | **Hiểu tổng thể luồng xử lý** | Phải "chạy" trong đầu qua từng vòng lặp, theo dõi nhiều biến cùng lúc thay đổi | Mỗi biến độc lập, không cần theo dõi trạng thái thay đổi qua từng vòng |
        | **Nesting (nested if)** | Có, đặc biệt phần theo `paymentMethod` lồng theo `status` (2 tầng if) | Không có nesting, chỉ có điều kiện `&&` trong 1 dòng |
        | **Dễ soát lỗi** | Khó vì phải tìm đúng đoạn trong 1 khối loop lớn | Dễ vì mỗi phép tính tách biệt, sai ở đâu sửa đúng chỗ đó |

        > 🔍 **Lưu ý:** **Cách 2 thắng** về độ dễ đọc từng phần riêng lẻ, nhưng có 1 nhược điểm: quá nhiều dòng `filter` tương tự nhau (`visaSuccess`, `visaFailed`, `visaPending`, `masterSuccess`...) khiến người đọc dễ lướt qua và nhầm lẫn giữa các dòng gần giống nhau — đây là vấn đề gọi là **"code trùng lặp cấu trúc"** (structural duplication).

        ## 3. Hiệu năng (Điểm quan trọng cần lưu ý)

        Đây là khác biệt lớn nhất mà 2 câu hỏi đầu không đề cập:

        * **Cách 1:** Duyệt mảng `payments` đúng 1 lần $\rightarrow$ độ phức tạp $O(n)$.
        * **Cách 2:** Gọi `filter()` 17 lần, mỗi lần duyệt lại toàn bộ mảng từ đầu $\rightarrow$ độ phức tạp $O(n \times 17)$.

        > ⚠️ Với 8 phần tử như data mẫu thì không ảnh hưởng gì, nhưng nếu `payments` có **1 triệu giao dịch**, Cách 2 sẽ chậm hơn rõ rệt vì duyệt lại mảng 17 lần thay vì 1 lần.

        ---

        ## Khi nào nên dùng mỗi cách?

        ### 4. Khi nào nên dùng for...of
        * Khi cần tính nhiều giá trị cùng lúc từ 1 lần duyệt (giống bài Dashboard này) $\rightarrow$ tối ưu hiệu năng, chỉ duyệt mảng 1 lần.
        * Khi logic tính toán có phụ thuộc lẫn nhau giữa các bước (ví dụ: vừa đếm, vừa cộng dồn, vừa phân loại trong cùng 1 vòng).
        * Khi cần `break`/`continue` để dừng sớm.
        * Khi dữ liệu lớn và hiệu năng quan trọng.

        ### 5. Khi nào nên dùng filter()
        * Khi cần lọc ra 1 tập con dữ liệu độc lập, không liên quan đến các phép tính khác $\rightarrow$ code ngắn gọn, dễ đọc từng dòng.
        * Khi dữ liệu nhỏ, hiệu năng không phải vấn đề, ưu tiên độ rõ ràng của code.
        * Khi cần bản thân mảng đã lọc (không chỉ độ dài) để xử lý tiếp, ví dụ: `payments.filter(...).map(...)`.

        ---

        ## Kết luận — Cách nào tốt hơn cho bài Dashboard này?

        **Cách 1 (for...of) phù hợp hơn cho bài toán cụ thể này**, vì:

        1.  Bài toán cần tính nhiều giá trị tổng hợp cùng lúc (18 biến) từ cùng 1 tập dữ liệu $\rightarrow$ duyệt 1 lần là tối ưu.
        2.  Cách 2 tuy code ngắn và từng dòng dễ đọc, nhưng phải duyệt lại mảng 17 lần cho cùng 1 việc lẽ ra chỉ cần 1 lần — đây là sự đánh đổi hiệu năng lấy sự ngắn gọn, chỉ chấp nhận được với dữ liệu nhỏ.
        3.  Cách 1 tuy dài hơn, nhưng nếu tách rõ ràng từng khối bằng comment (như bạn đã làm: `//check status`, `//check payment method`, `//check suspicious tranx`) thì vẫn đủ dễ đọc và tối ưu hơn về hiệu năng.

    */
})


