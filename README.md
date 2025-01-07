# Sketch It! - A Fun Drawing and Guessing Game

Sketch It! is an interactive web application that combines drawing skills with word-guessing in a timed, single-player experience. Players draw sketches based on given words, aiming to improve their scores and climb the leaderboard.

This React-based game utilizes AWS services for authentication, data storage, and image analysis. It features a user-friendly interface with a sketching canvas, word blocks for guessing, and real-time game information. The application is designed to be engaging and challenging, with difficulty levels that adapt to the player's performance.

## Repository Structure

The repository is organized as follows:

- `src/`: Contains the main source code for the application
  - `components/`: React components for UI elements
  - `context/`: Context providers for game state and authentication
  - `hooks/`: Custom React hooks for various functionalities
  - `pages/`: React components for different pages/routes
  - `services/`: Services for interacting with AWS and other external services
  - `styles/`: CSS files for styling the application
  - `utils/`: Utility functions and constants
- `aws/`: AWS-related configuration and documentation
- `public/`: Public assets and HTML template
- `index.html`: Entry point HTML file
- `package.json`: Project dependencies and scripts
- `vite.config.js`: Vite configuration file
- `postcss.config.js`: PostCSS configuration file
- `tailwind.config.js`: Tailwind CSS configuration file

Key Files:
- `src/main.jsx`: Application entry point
- `src/App.jsx`: Main application component
- `src/aws-config.js`: AWS Amplify configuration
- `src/context/GameContext.jsx`: Game state management
- `src/pages/Game.jsx`: Main game component

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- npm (v6 or later)

Steps:
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_COGNITO_USER_POOL_ID=your_user_pool_id
   VITE_COGNITO_CLIENT_ID=your_client_id
   VITE_AWS_REGION=your_aws_region
   VITE_APPSYNC_API_URL=your_appsync_api_url
   VITE_APPSYNC_API_KEY=your_appsync_api_key
   VITE_AWS_ACCESS_KEY_ID=your_aws_access_key_id
   VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   ```

2. Update AWS configurations in `src/aws-config.js` if necessary.

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Playing the Game

1. Sign up or log in using the authentication modal.
2. Start a new game from the home page.
3. Draw the given word within the time limit.
4. Submit your drawing for analysis.
5. Continue playing to improve your score and unlock new difficulty levels.

### Testing & Quality

To run tests (if implemented):

```bash
npm test
```

### Troubleshooting

Common issues:
1. Authentication errors:
   - Ensure AWS Cognito credentials are correct in the `.env` file.
   - Check browser console for specific error messages.
   - Verify network connectivity to AWS services.

2. Drawing submission fails:
   - Check AWS credentials for DynamoDB and S3.
   - Ensure rate limits are not exceeded (1 request per 1.5 seconds).
   - Verify network connectivity and AWS service status.

3. Game doesn't start:
   - Clear browser cache and reload the page.
   - Check console for JavaScript errors.
   - Ensure all required environment variables are set.

Debugging:
- Enable verbose logging by setting `localStorage.setItem('debug', 'true')` in the browser console.
- Check browser developer tools for network requests and responses.
- Review AWS CloudWatch logs for backend errors (if applicable).

## Data Flow

The Sketch It! application follows a client-side data flow with integration to AWS services. Here's an overview of how data moves through the application:

1. User Authentication:
   [User] -> [Cognito] -> [Application]

2. Game Initialization:
   [GameContext] -> [Game Component] -> [UI Components]

3. Drawing Submission:
   [DrawingCanvas] -> [GameContext] -> [DynamoDB] -> [S3]

4. Score Update:
   [GameContext] -> [DynamoDB]

5. Leaderboard:
   [DynamoDB] -> [Leaderboard Component] -> [UI]

```mermaid
+-------------+     +-----------+     +-------------+
|    User     | <-> |  Cognito  | <-> | Application |
+-------------+     +-----------+     +-------------+
                                           |
                                           v
+-------------+     +-----------+     +-------------+
| GameContext | <-> |   Game    | <-> |     UI      |
+-------------+     +-----------+     +-------------+
      |                   |                 |
      |                   |                 |
      v                   v                 v
+-------------+     +-----------+     +-------------+
|  DynamoDB   | <-> |    S3     | <-> |   Bedrock   |
+-------------+     +-----------+     +-------------+
```

Note: Ensure proper error handling and retry mechanisms are in place for AWS service interactions.

## Infrastructure

The Sketch It! application utilizes the following AWS resources:

### Cognito
- User Pool: Manages user authentication and authorization
- User Pool Client: Allows the application to interact with the User Pool

### DynamoDB
- SketchItDrawings: Stores user drawings
  - Primary Key: id (String)
  - Global Secondary Index: UserDrawingsIndex (userId, createdAt)
- SketchItPlayers: Stores player information
  - Primary Key: id (String)
  - Global Secondary Indexes: UsernameIndex, LevelIndex

### S3
- Bucket: Stores drawing images (not explicitly defined in provided code)

### AppSync
- GraphQL API: Provides a GraphQL interface for data operations (configuration present in aws-config.js)

### IAM
- IAM Role: Provides necessary permissions for the application to interact with AWS services (implied by the presence of AWS credentials)

### Bedrock
- Used for image analysis (implied by the presence of rate limiting configuration for Bedrock)


Note: Ensure that all necessary IAM permissions are set up correctly for the application to interact with these AWS services securely.
