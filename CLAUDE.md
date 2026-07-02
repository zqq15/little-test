# little-test

独立项目，与 `~/Xiaobandeng/` 下的其他目录无关联。

## 隔离边界

- **Memory**：本项目使用专属 memory 目录，按项目绝对路径自动隔离，不读取、不写入其他项目的 memory。
- **Settings**：项目级配置走 `.claude/settings.json`（入 git）与 `.claude/settings.local.json`（不入 git）。
- **依赖 / 产物**：本项目安装的依赖、生成的文件只允许落在本项目目录内。

## 项目说明

<!-- TODO: 待用户补充 —— 这个项目是做什么的、技术栈、关键约束等 -->

## 工作偏好

<!-- TODO: 待用户补充 —— 偏好的语言、命名风格、测试约定等 -->
