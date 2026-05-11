import requests, json, time

print("Night Bot Started...")

# 1. Pending IDs file ko directly padho
url = "https://raw.githubusercontent.com/agurjeet768-tech/loan-dashboard/main/src/pages/pending_ids.json"

try:
    r = requests.get(url)
    pending_ids = r.json()
    ids_list = list(pending_ids.keys())
    
    if len(ids_list) == 0:
        print("Koi pending ID nahi hai. Bot aaram kar raha hai 😴")
    else:
        print(f"Total {len(ids_list)} Pending IDs mili: {ids_list}")
        
        # Ek baar mein 5 IDs bhejenge taaki server par load na pade
        for i in range(0, len(ids_list), 5):
            batch = ids_list[i:i+5]
            contracts_str = ",".join(batch)
            
            print(f"Hugging Face API ko bhej raha hu: {contracts_str}")
            hf_url = f"https://gauravkumar80500-loandataapi.hf.space/scrape_custom?contracts={contracts_str}"
            
            # API hit karo (Ye API apne aap naye number dhoondh kar GitHub update kar degi)
            hf_resp = requests.get(hf_url, timeout=60)
            print(f"Batch Done! Status: {hf_resp.status_code}")
            
            # Thoda aaram taaki API block na ho (5 seconds)
            time.sleep(5)
            
except Exception as e:
    print("Error aaya:", e)
    
print("Night Bot Task Complete! ✅")
