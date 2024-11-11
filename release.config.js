export default {
  branches: ["master"], // 릴리즈를 생성할 브랜치
  plugins: [
    "@semantic-release/commit-analyzer", // 커밋 메시지 분석
    "@semantic-release/release-notes-generator", // 릴리즈 노트 생성
    "@semantic-release/changelog", // CHANGELOG.md 업데이트
    "@semantic-release/github", // GitHub 릴리즈 생성
    "@semantic-release/git", // 변경사항 Git 커밋 및 푸시
  ],
};
