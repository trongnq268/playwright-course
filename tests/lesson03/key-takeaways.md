## **Lesson 3 - Key Takeaways: Interface vs Type trong TypeScript** 

## **1. Khái niệm** 

- interface: Định nghĩa cấ�u trúc object, class, function. 

- type: Định nghĩa kiểu dữệ li u (object, primitive, union, tuple, literal...). - Cả hai đề& u mô tả shape của object. 

## **2. Điểm giống nhau** 

- Đề& u dùng để khai báo kiểu cho object. - Đề& u hô* trợ IntelliSense và kiểm tra kiểu. 

## **3. Khác nhau** 

- interface: extends, implements, declaration merging. 

- type: union (|), intersection (&), tuple, literal, alias phức tạp. 

## **4. Kế thừa** 

interface dùng extends. type dùng & (intersection). 

## **5. Declaration Merging** 

Chỉ interface hô* trợ: nhiề& u interface cùng tền sẽ tựộ đ ng gộp. 

## **6. Union/Tuple/Literal** 

Chỉ type hô* trợự t nhiền. Ví dụ Status = 'passed'|'failed'|'skipped'. 

## **7. Áp dụng trong QA/Automation** 

- interface: API Response, Request Payload, Test Data, Page Object. 

- type: trạng thái test, alias, tuple, utility types. 

## **8. Nguyên tắc** 

1. u tiền interface cho object.Ư 

2. Dùng type khi cấ& n union/tuple/literal. 

3. Thô�ng nhấ�t convention trong team. 

## **9. Bảng so sánh** 

interface: 

- Object: ✓ 

- extends: ✓ 

- implements: ✓ 

- Declaration merging: ✓ 

- Union/Tuple: ✗ 

## type: 

- Object: ✓ 

- Intersection &: ✓ 

- Union/Tuple/Literal: ✓ 

- Declaration merging: ✗ 

