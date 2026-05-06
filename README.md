# My Anime Openings

## Project Description

**My Anime Openings** is a web application that allows users to create an account, search for anime openings, view opening results, rate individual openings, and keep track of their personal rankings. The project uses **Next.js** for the frontend and backend routes, **Supabase** for authentication and database storage, and the **AnimeThemes API** to retrieve anime opening data.

The application also uses a cache-first approach when searching for anime openings. When a user searches for an anime, the system first checks the database/cache to see if the result already exists. If the data is found, it is loaded from the cache. If it does not exist, the system makes a request to the external AnimeThemes API and stores the result for future use.

## Team Members

- Kaitlyn Jao
- Alexander Peras

## Main Features

- User signup and login
- Supabase authentication
- Anime search functionality
- External API integration using AnimeThemes
- Cache-first search behavior
- Search results list for anime openings
- Detail page for selected anime openings
- Rating submission for anime openings
- Saved ratings connected to user accounts
- Account/profile page showing ratings ordered from highest to lowest

## Technology Stack

- **Frontend:** Next.js, React
- **Backend:** Next.js API routes
- **Database:** Supabase SQL database
- **Authentication:** Supabase Auth
- **External API:** AnimeThemes API
- **Styling:** CSS / project-specific styling

## Project Workflow

1. A user enters the My Anime Openings web application.
2. A new user can create an account using the signup page.
3. Existing users can log in with their credentials.
4. After authentication, the user can search for an anime.
5. The system checks the cache/database for existing anime opening data.
6. If cached data exists, the application uses that data.
7. If cached data does not exist, the application calls the AnimeThemes API.
8. Search results are displayed to the user.
9. The user can select an anime opening from the results list.
10. The selected opening redirects to a detail page.
11. The user can submit a rating for the opening.
12. The rating is saved to the user’s account in Supabase.
13. The user can view their saved ratings on the account/profile page, ordered from highest to lowest.

## User Authentication

The application supports account creation and login. New users are registered through Supabase, while existing users are authenticated through the login endpoint. The application verifies user credentials before allowing access to account-specific features such as saved ratings.

## Search and API Behavior

The anime search feature is connected to the AnimeThemes API. To improve performance and reduce unnecessary API calls, the application checks cached data first. If the requested anime opening information already exists in the database, it is returned directly. If not, the application sends a request to the external API and stores the returned data for future searches.

## Rating System

Users can rate individual anime openings after selecting them from the search results. Once submitted, the rating is saved to the user’s account. The account page displays all saved ratings in order from highest to lowest, allowing users to view their personal ranking of anime openings.


## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate into the project folder:

```bash
cd my-anime-openings
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file and add the required Supabase and API environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

5. Run the development server:

```bash
npm run dev
```

6. Open the application in your browser:

```text
http://localhost:3000
```

## Testing

Main test cases include:

- Verifying new user account creation
- Verifying successful login
- Verifying anime search functionality
- Verifying cache-first behavior before external API calls
- Verifying external API calls when data is not cached
- Verifying search results display
- Verifying redirect to selected anime opening page
- Verifying rating submission
- Verifying ratings are saved to the correct user account
- Verifying account page ratings are ordered from highest to lowest

## Future Improvements

- Add more detailed user profiles
- Allow users to edit or delete ratings
- Add favorite anime openings
- Improve search filtering and sorting
- Add loading states and stronger error handling
- Improve responsive design for mobile devices

## License

This project was created for CPSC362 coursework.
