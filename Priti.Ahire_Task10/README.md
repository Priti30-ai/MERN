# LaundryCare – CSS Animation Project

LaundryCare is a simple web page for a laundry service.  
It is made to practice HTML, CSS, and animations.

The main goal is to make a nice-looking page and add a smooth animation to the laundry image.


## Project Features

- A simple laundry service web page
- Works on mobile, tablet, and desktop

**Header section:**
- Logo (LaundryCare)
- Menu links (Home, Services, About Us, Contact Us)
- User button (Priti Ahire)

**Hero (main) section:**
- Big heading and description
- “Book a Service Today!” button
- Laundry image with animation

**Animation:**
- Image moves up and down smoothly
- Image gets a little squeezed while moving using `scaleX()`


## Project Files
LaundryCare/
│
├── index.html
├── style.css
└── README.md


- `index.html` – page structure (HTML)
- `style.css` – design and animation (CSS)
- `README.md` – this file (simple info about the project)


## How to Run

1. Download or copy the project folder.
2. Open the folder.
3. Double-click `index.html` to open it in your browser.
4. You will see the web page with the animated image.


## Animation Details

The animation is made using CSS `@keyframes`.

- `translateY()` → moves the image up and down  
- `scaleX()` → makes the image a bit narrower (squeezed) at some points  
- The animation runs again and again using:

```css
animation: orbitMove 6s ease-in-out infinite;
```

## Responsive Design

The page is made to look good on different screen sizes.

It works on:

- Desktop
- Tablet
- Mobile

This is done using `@media` queries in CSS.


## What I Learned

- How to make a web page using HTML and CSS
- How to use Flexbox to align elements
- How to add hover effects on buttons and links
- How to create animations using `@keyframes`
- How to make the page responsive using media queries