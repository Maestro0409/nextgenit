import re
import os
import requests
import html

# Define paths
html_file_path = r'c:\Users\ronin\Desktop\web\1.html'
output_dir = r'c:\Users\ronin\Desktop\web\assets\images'

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# Read the HTML file
with open(html_file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Regex to find image URLs in the SR7.JSON data or generally in the file
# Looking for the escaped URLs specifically in the JSON structure first
# "src": "https:\/\/...
regex = r'"src":\s*"([^"]+)"'

matches = re.finditer(regex, content)
downloaded = set()

for match in matches:
    url = match.group(1).replace(r'\/', '/')
    
    # Filter for relevant images (from the slider)
    if 'artistic-parallax-slider' in url:
        filename = url.split('/')[-1]
        filepath = os.path.join(output_dir, filename)
        
        if url in downloaded:
            continue
            
        downloaded.add(url)
        
        print(f"Downloading {filename} from {url}...")
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()
            with open(filepath, 'wb') as out_file:
                for chunk in response.iter_content(chunk_size=8192):
                    out_file.write(chunk)
            print(f"Saved to {filepath}")
        except Exception as e:
            print(f"Failed to download {url}: {e}")

print("Done.")
