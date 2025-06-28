# How to Add New Reviews

## Easy Review Management System

Instead of editing HTML code every time you get a new review, you can now simply edit the `reviews.json` file!

## Adding a New Review

1. **Open the `reviews.json` file** in any text editor
2. **Add a new review** to the "reviews" array following this format:

```json
{
  "name": "Guest Name",
  "date": "Month Year",
  "rating": 5,
  "content": "The full review text goes here...",
  "highlight": "A short highlight phrase"
}
```

## Example

```json
{
  "reviews": [
    {
      "name": "Dehit",
      "date": "May 2025",
      "rating": 5,
      "content": "Really an amazing place to stay in West Maui, you can view spectacular sunsets right from your balcony while enjoying your meal. Provided good quality beach gear so that we can have more fun. Clean and peaceful place with loads of utilities and amenities in house, and also got a chance to view sea turtles right from our balcony floating in the water below.",
      "highlight": "Spectacular sunsets and sea turtles from the balcony"
    },
    {
      "name": "New Guest",
      "date": "June 2025",
      "rating": 5,
      "content": "Amazing stay! The ocean views were incredible and the condo had everything we needed.",
      "highlight": "Incredible ocean views"
    }
  ]
}
```

## What Each Field Means

- **name**: Guest's first name (or initials for privacy)
- **date**: When they stayed (e.g., "May 2025", "June 2025")
- **rating**: Star rating (1-5, typically 5 for good reviews)
- **content**: The full review text (keep it authentic)
- **highlight**: A short phrase that captures the key point (optional but recommended)

## Benefits

✅ **No coding required** - Just edit a simple text file  
✅ **Instant updates** - Refresh the page to see changes  
✅ **Easy to manage** - All reviews in one place  
✅ **Backup friendly** - JSON file is easy to backup  
✅ **No broken code** - Can't accidentally break the website  

## Tips

- Keep the JSON format valid (commas, quotes, brackets)
- Use a text editor like Notepad, VS Code, or any code editor
- Test the website after adding reviews to make sure they appear
- The carousel will automatically adjust to show the correct number of reviews

That's it! Much easier than editing HTML code every time. 