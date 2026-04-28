# Implementation Plan: Core Bookclub Infrastructure & MVP Logging

## Phase 1: Infrastructure & Scaffolding [checkpoint: 1c1dc8c]
- [x] Task: Project Initialisation [398615b]
    - [ ] Set up Vue.js project with TypeScript.
    - [ ] Configure Supabase project and client-side integration.
- [x] Task: Database Schema Definition [5e293f6]
    - [ ] Create `profiles` table for students and teachers.
    - [ ] Create `classes` table for managing student groups.
    - [ ] Create `books` table for cached book metadata.
    - [ ] Create `reading_logs` table to track progress.
- [x] Task: Conductor - User Manual Verification 'Infrastructure & Scaffolding' (Protocol in workflow.md) [1c1dc8c]

## Phase 2: Authentication & Core UI
- [~] Task: Implement Authentication
    - [ ] Create Sign-up and Login views using Supabase Auth.
    - [ ] Implement protected routes for student/teacher areas.
- [ ] Task: Basic Layout & Navigation
    - [ ] Set up the main application shell and navigation for both roles.
- [ ] Task: Conductor - User Manual Verification 'Authentication & Core UI' (Protocol in workflow.md)

## Phase 3: MVP Logging Feature
- [ ] Task: Book Search & Selection
    - [ ] Implement search interface using Open Library API.
    - [ ] Allow users to select a book and view basic metadata.
- [ ] Task: Log Entry Implementation
    - [ ] Create form to log a reading session (date, page count).
    - [ ] Persist log entries to the `reading_logs` table in Supabase.
- [ ] Task: Conductor - User Manual Verification 'MVP Logging Feature' (Protocol in workflow.md)

## Phase 4: Initial Teacher Dashboard
- [ ] Task: Dashboard Skeleton
    - [ ] Create a view for teachers to see all students in a mock class.
- [ ] Task: Simple Data Aggregation
    - [ ] Display basic totals (total books/pages) per student in the dashboard.
- [ ] Task: Conductor - User Manual Verification 'Initial Teacher Dashboard' (Protocol in workflow.md)
