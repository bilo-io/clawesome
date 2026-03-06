package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

type MarketplaceItem struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Category    string `json:"category"`
	Description string `json:"description"`
	IconName    string `json:"iconName"`
	IsNew       bool   `json:"isNew,omitempty"`
	IsPopular   bool   `json:"isPopular,omitempty"`
}

var marketplaceData []MarketplaceItem

func loadData() {
	jsonFile, err := os.Open("data/marketplace.json")
	if err != nil {
		log.Fatalf("Error opening JSON file: %v", err)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &marketplaceData)
	fmt.Printf("Loaded %d items from marketplace.json\n", len(marketplaceData))
}

func getCategoryFromType(t string) string {
	switch strings.ToLower(t) {
	case "skill":
		return "Skills"
	case "integration":
		return "Integrations"
	case "plugin":
		return "Plugins"
	case "mcp":
		return "MCP"
	default:
		return ""
	}
}

func marketplaceHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	itemType := r.URL.Query().Get("type")
	if itemType == "" {
		json.NewEncoder(w).Encode(marketplaceData)
		return
	}

	targetCategory := getCategoryFromType(itemType)
	var filtered []MarketplaceItem

	for _, item := range marketplaceData {
		if strings.EqualFold(item.Category, targetCategory) {
			filtered = append(filtered, item)
		}
	}

	if filtered == nil {
		filtered = []MarketplaceItem{}
	}

	json.NewEncoder(w).Encode(filtered)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if len(marketplaceData) == 0 {
		loadData()
	}
	marketplaceHandler(w, r)
}

func main() {
	loadData()

	http.HandleFunc("/api/v1/marketplace", marketplaceHandler)
	http.HandleFunc("/", Handler) // Catch-all for Vercel

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server starting on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
