Product Requirements Document (PRD) - React Shopping Cart

Product Overview

The goal is to build a fully functional shopping cart using React and Next.js. This application should be user-friendly, responsive, and follow modern web development best practices. It interfaces with the Fake Store API to display and manage products.

⸻

Objectives
	•	Display a list of products with title, description, and price
	•	Allow users to add products to the cart
	•	Implement a cart view with total amounts and itemized quantities
	•	Provide a detailed product view with full information
	•	Search and filter functionality
	•	Local pagination for better UX
	•	Ensure responsiveness and error handling

⸻

Target Users
	•	Users looking to simulate or test shopping behavior on a front-end store
	•	Companies evaluating front-end candidates

⸻

Key Features

1. Home Page
	•	Product cards with details and “Add to Cart”
	•	Search bar that filters already loaded products
	•	“See More” button that reveals more products (pagination)
	•	Cart badge icon in the header updates with item count

2. Shopping Cart Page
	•	List of items added to the cart
	•	Display of quantity, title, total price per item
	•	Option to return to Home

3. Product Details Page
	•	Image, title, description, and price
	•	Add to Cart functionality
	•	Clean and consistent UI, responsive design

⸻

UX Expectations
	•	Intuitive navigation between pages
	•	Immediate feedback for user actions
	•	Responsiveness for mobile and desktop
	•	Informative error states and fallbacks

⸻

Non-Functional Requirements
	•	Must work with modern browsers (Chrome, Firefox, Safari, Edge)
	•	Unit tests must be provided for main components
	•	Maintainable and well-documented code
	•	Consistent styling and UI behavior across the app

⸻

Constraints
	•	Must use Fake Store API for products
	•	Styling framework is flexible but must be consistent
	•	Must be delivered within 72 hours

⸻

Success Criteria
	•	Application runs without errors
	•	Functional navigation and cart interactions
	•	Matches provided design
	•	One or more UX improvements beyond base spec
	•	Well-structured GitHub repo with README
	•	Tests implemented for core components

Overview
React Coding Challenge (Shopping Cart)

Objective

The goal of this challenge is to correctly assess your knowledge of React and your approach to componentizing the proposed solution. It is important that you apply your best practices, and if you make any decisions that deviate from standard practices, please explain why. Additionally, we will positively value the creation of unit tests.

⸻

Instructions

You are required to build a shopping store using React with Next.js as the framework.
🔗 Visit: https://nextjs.org/

To display products, use the following API:
🔗 https://fakestoreapi.com/products

We also provide the design of two of the three screens to be implemented.
We expect you to faithfully reproduce the design without getting caught up in minor details.

⸻

Main Page

On the home page, you will find:
	•	A header with:
	•	Logo
	•	Search bar
	•	Badge/icon showing the number of items in the cart
	•	Product cards displaying:
	•	Title
	•	Description
	•	Price
	•	Action button to add the product to the cart

Each time a product is added to the cart:
	•	Update the global cart quantity displayed in the header
	•	Synchronize the cart content with the Shopping Cart view

Additionally:
	•	The search bar filters products already loaded on the page
	•	Implement a “See More” button to request more products (local pagination)
	•	By default, only 3 products (one row) should be displayed

⸻

Shopping Cart Page

The user will navigate to the shopping cart view by clicking the cart icon.

This page should display:
	•	Product title
	•	Product quantity
	•	Total amount

Include a “Continue Shopping” button to return to the main page.

⸻

Product Details Page

Design and develop a user-friendly product details page that displays:
	•	Image
	•	Title
	•	Description
	•	Price
	•	Ability to add product to cart

This layout should be:
	•	Clean and intuitive
	•	Support responsive design
	•	Consistent with the overall UI
	•	Optimized for readability and engagement

⸻

Important Considerations

You’ll need to make the following technical decisions:
	•	How to manage application state (products, cart, added items, etc.)
	•	Choice of styling framework (SASS, LESS, Styled Components, Tailwind, Pure CSS, etc.)
	•	How to keep the main page updated with the latest products
	•	How to handle errors and communicate them to the user
	•	Use of custom hooks (if necessary)
	•	Implementation of local pagination
	•	Creation of unit tests for key components
	•	Feel free to use AI-assisted tools to complete the challenge

Some UX aspects were intentionally left vague — we encourage you to identify and implement at least one improvement.

⸻

Submission Information
	•	Estimated Time: Around 2 hours (but feel free to take more if needed to make it more complete or explore extra complexity)
	•	Deadline: Submit your solution within 72 hours. If you need more time, just let us know — earlier submissions are appreciated
	•	Submit via Email:
	•	To: lzapata@goempirical.com
	•	Cc: cflores@goempirical.com
	•	Subject: React Coding Challenge – [Your Name]
	•	Include:
	•	Public link to your GitHub repository with the solution
	•	Or grant access to: GitHub – Leandro Zapata
	•	Optionally include details about your implementation in the email or the project’s README.md