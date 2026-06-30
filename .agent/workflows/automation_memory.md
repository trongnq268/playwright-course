---
description: Phân tích toàn bộ cuộc hội thoại hiện tại và tạo một bản "Conversation Recovery Summary" có cấu trúc rõ ràng để tiếp tục công việc ở session khác mà không mất context.
skills:
  - qa_automation_engineer
---

# Workflow: Automation Memory (Conversation Recovery)

Workflow này giúp phân tích toàn bộ cuộc hội thoại hiện tại và tạo một bản "Conversation Recovery Summary" có cấu trúc rõ ràng để bạn có thể tiếp tục công việc ở session khác mà không mất context.

## Yêu cầu thực thi

1. Chỉ tóm tắt thông tin QUAN TRỌNG cho việc tiếp tục workflow.
2. Không copy toàn bộ hội thoại.
3. Không thêm giả định ngoài nội dung đã trao đổi.
4. Ưu tiên:
   - project context
   - architecture decisions
   - automation framework decisions
   - coding standards
   - workflow rules
   - pending tasks
   - completed tasks
   - important feedback
   - known issues
   - file structure
   - helper/page/spec conventions
   - unresolved discussions
5. Nếu có nhiều quyết định xung đột:
   - ghi rõ quyết định cuối cùng đã được thống nhất.
6. Nếu có nội dung chưa được chốt:
   - đưa vào mục "Pending Clarifications".
7. Xuất kết quả dưới dạng Markdown.
8. Format phải tối ưu để AI khác có thể đọc và resume workflow ngay lập tức.
9. Không viết lan man — ưu tiên concise nhưng đầy đủ context kỹ thuật.
10. Nếu có workflow/memory protocol đang dùng:
   - hãy tóm tắt cả protocol đó.
11. Vị trí lưu file kết quả bắt buộc: Thư mục `.brain` nằm ở root của project hiện tại.
12. Định dạng tên file: `[tên_file_spec_đang_làm]_[DDMMYY]_[hhmm].md` (ví dụ: `ar-create.spec_090526_2320.md`). Tuyệt đối không dùng ký tự `/` hoặc `:` trong tên file để tránh lỗi của hệ điều hành.

## Output Format (Mẫu bắt buộc)

```markdown
# Conversation Recovery Summary

## Project Context
[Tóm tắt ngữ cảnh dự án, module đang làm việc, mục tiêu chính]

## Confirmed Decisions
[Các quyết định kỹ thuật, nghiệp vụ đã được chốt]

## Architecture & Standards
[Quyết định về kiến trúc, ví dụ: POM, Helper, Fixtures...]

## Workflow Rules
[Các rule đặc biệt được áp dụng trong quá trình làm việc, ví dụ: bắt buộc chạy serial, chờ confirm...]

## Completed Work
[Danh sách các task/test case/file đã hoàn thành]

## Pending Tasks
[Danh sách các việc còn lại cần làm ở session sau]

## Known Issues
[Các lỗi đã biết, flaky tests, limit của hệ thống...]

## Important User Feedback
[Góp ý quan trọng từ user cần lưu ý cho các task sau]

## File/Module References
[Đường dẫn tới các file quan trọng: page, spec, helper, tài liệu yêu cầu]

## Pending Clarifications
[Những câu hỏi hoặc quyết định chưa được chốt]

## Recommended Next Step
[Đề xuất bước tiếp theo khi bắt đầu session mới]
```
