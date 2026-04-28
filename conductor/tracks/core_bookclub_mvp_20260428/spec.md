# Specification: Core Bookclub Infrastructure & MVP Logging

## Overview
This track focuses on setting up the fundamental infrastructure for the School Bookclub Manager and implementing the core user story of logging a book.

## Scope
- Initial project scaffolding (Vue.js, TypeScript, Supabase integration).
- Basic database schema (Users, Classes, Books, Reading Logs).
- Student authentication (Login/Sign-up).
- Core "Log a Book" feature with API-based metadata lookup.
- Basic "Teacher Dashboard" skeleton to view student logs.

## Technical Details
- **Frontend:** Vue.js (Composition API) with TypeScript.
- **Backend/DB:** Supabase for Auth and PostgreSQL data storage.
- **Book API:** Integration with Open Library API for book metadata.
- **Styling:** Vanilla CSS for the MVP.

## Success Criteria
- Students can successfully sign up and log in.
- A student can search for a book and log it to their profile.
- Reading logs are correctly stored in Supabase.
- A basic dashboard displays a list of logged books for a mock class.
