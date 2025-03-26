#!/usr/bin/env python3
"""
Script to debug directory structure on Render
"""
import os
import sys

print("=== DEBUGGING DIRECTORY STRUCTURE ===")
print(f"Current working directory: {os.getcwd()}")
print(f"Python executable: {sys.executable}")
print("\nListing directory contents:")

# List the root directory contents
print("\nRoot directory contents:")
for item in os.listdir('.'):
    print(f"- {item}")

# Try to list backend directory if it exists
if os.path.exists('backend'):
    print("\nBackend directory contents:")
    for item in os.listdir('backend'):
        print(f"- {item}")
else:
    print("\nNo 'backend' directory found!")

# Print environment variables
print("\nEnvironment variables:")
for key, value in os.environ.items():
    if key.startswith("RENDER") or key in ["PATH", "PYTHONPATH"]:
        print(f"{key}={value}")
        
print("\n=== END DEBUGGING ===") 