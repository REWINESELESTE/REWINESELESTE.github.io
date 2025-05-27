#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class MenuInjector {
  constructor() {
    this.menuPath = path.join(__dirname, 'menu.html');
    this.startTag = '<!-- inject:nav -->';
    this.endTag = '<!-- endinject -->';
  }

  loadMenuTemplate() {
    try {
      return fs.readFileSync(this.menuPath, 'utf8').trim();
    } catch (error) {
      console.error(`Error reading menu template: ${error.message}`);
      process.exit(1);
    }
  }

  findHtmlFiles(dir = __dirname) {
    let htmlFiles = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip node_modules and hidden directories
          if (!item.startsWith('.') && item !== 'node_modules') {
            htmlFiles = htmlFiles.concat(this.findHtmlFiles(fullPath));
          }
        } else if (item.endsWith('.html')) {
          htmlFiles.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}: ${error.message}`);
    }
    
    return htmlFiles;
  }

  injectMenu(filePath, menuContent) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Check if file has injection markers
      const startIndex = content.indexOf(this.startTag);
      const endIndex = content.indexOf(this.endTag);
      
      if (startIndex === -1 || endIndex === -1) {
        console.log(`⚠️  Skipping ${path.relative(__dirname, filePath)} - no injection markers found`);
        return false;
      }
      
      if (startIndex >= endIndex) {
        console.error(`❌ Invalid marker order in ${path.relative(__dirname, filePath)}`);
        return false;
      }
      
      // Replace content between markers
      const before = content.substring(0, startIndex + this.startTag.length);
      const after = content.substring(endIndex);
      const newContent = before + '\n' + menuContent + '\n' + after;
      
      // Write back to file
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Updated ${path.relative(__dirname, filePath)}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  run() {
    console.log('🔄 Starting menu injection...\n');
    
    const menuContent = this.loadMenuTemplate();
    const htmlFiles = this.findHtmlFiles();
    
    if (htmlFiles.length === 0) {
      console.log('No HTML files found.');
      return;
    }
    
    let processedCount = 0;
    let updatedCount = 0;
    
    for (const filePath of htmlFiles) {
      processedCount++;
      if (this.injectMenu(filePath, menuContent)) {
        updatedCount++;
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   • Files processed: ${processedCount}`);
    console.log(`   • Files updated: ${updatedCount}`);
    console.log(`   • Files skipped: ${processedCount - updatedCount}`);
  }
}

// Run the script
if (require.main === module) {
  const injector = new MenuInjector();
  injector.run();
}

module.exports = MenuInjector;