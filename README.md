# Quiz App

## Information

- Name: Dawit Yohans
- ID: UGR/4173/16
- Section: B

## Project Description

This mobile quiz application allows users to choose a category and answer timed multiple-choice questions. The app tracks the score, gives instant visual feedback for correct and wrong answers, and shows a final performance summary at the end of each quiz.

## App Functionality

1. Category Selection
   - The home screen shows quiz categories: Technology, Science, History, and Math.
   - Users start a quiz by selecting one category card.

2. Timed Quiz Flow
   - Each quiz question has four options and a 15-second timer.
   - Users choose one option and press "Lock In Answer".
   - If time runs out, the question is treated as unanswered and the app proceeds automatically.

3. Instant Feedback
   - Correct answers are highlighted in green.
   - Wrong selections or timeouts are highlighted in red.
   - A progress bar and question counter show quiz progress.

4. Result Summary
   - After the final question, the app navigates to a results screen.
   - It calculates score percentage and displays a feedback message based on performance.
   - Users can return to the home screen to attempt another category.

## UI Construction and Visual Style

- Built with React Native + Expo Router using file-based navigation.
- The design uses a card-based layout with rounded corners, soft shadows, and clear spacing.
- A gradient hero section is used on key screens to create visual emphasis.
- Iconography from Ionicons helps identify categories and actions.
- The quiz screen includes a progress bar, timer badge, and interactive answer buttons for clear flow.
- A theme context controls colors for consistency and supports light/dark styling behavior.
- The result screen uses a circular progress indicator, score cards, and a primary action button for intuitive navigation.

## Published Build

The application has been published on Expo.

If you want to test the complete app experience,You can download and run the latest build from this link:

https://expo.dev/accounts/dawityo/projects/Quiz-App/builds/aba37770-d880-4ab2-a1c1-79c4843edda4

This published version includes the full quiz flow, timer behavior, answer feedback states, and the final score/result interface.