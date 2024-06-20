# EventPulse Web App

A Twilio Sement clone project.

**Disclaimer**: This is a learning project and is not intended as an official website. The site is for educational purposes only.

## Overview

EventPulse is a comprehensive event tracking and data management platform designed to help users capture, store, and analyze event data from their applications. This project is intended to demonstrate the implementation of a full-stack solution using modern web technologies.

## Technologies Used

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Hosting**: [Vercel](https://vercel.com/)
- **Database**: [Supabase](https://supabase.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.dev/)
- **CSS**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Features

### Dashboard

- **User Authentication**: Secure login and logout functionality using Supabase Auth.
- **Event Debugger**: Real-time view of events as they are tracked by the SDK.
- **Source Management**: Create and manage sources, which provide api keys to be used in the EventPulse SDK.
- **Destination Management**: Configure and manage destinations like BigQuery to store your event data.

### Data Handling

- **Supabase Integration**: Utilize Supabase for real-time data management, storage, and authentication.
- **BigQuery Integration**: Automatically send event data to Google BigQuery for advanced analytics and reporting.
- **Real-Time Data**: Utilize Supabase’s real-time capabilities to monitor incoming events in the dashboard.

## Usage

### EventPulse SDK

The EventPulse SDK can be found at this [repo](https://github.com/robbiecren07/eventpulse-sdk-js) 

## Live Demo

Check out the live version of this project at [EventPulse Web App](https://eventpulse-app.vercel.app/).

## TODOS

- build overview page.
- implement cookies to reduce db requests.
- user profiles and account management.
- remove geo info on apis, as it doesnt seem to work on external requests.
