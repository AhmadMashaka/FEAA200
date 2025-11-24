# 🚀 Deployment Guide for GitHub Pages

This guide will help you deploy the Fish Species Explorer to GitHub Pages.

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- The repository: https://github.com/AhmadMashaka/FEAA200.git

## 🔧 Setup Steps

### 1. Initialize Git Repository (if not already done)

```bash
cd /Users/ahmadmashaka/Desktop/Curso/fish-species-explorer
git init
git add .
git commit -m "Initial commit: Fish Species Explorer with Recipes"
```

### 2. Connect to GitHub Repository

```bash
git remote add origin https://github.com/AhmadMashaka/FEAA200.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository: https://github.com/AhmadMashaka/FEAA200
2. Click on **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 4. Wait for Deployment

- The GitHub Action will automatically build and deploy your site
- Check the **Actions** tab to see the deployment progress
- Once complete (green checkmark), your site will be live at:
  
  **🌐 https://ahmadmashaka.github.io/FEAA200/**

## 🔄 Making Updates

After the initial deployment, any time you want to update the website:

```bash
# Make your changes, then:
git add .
git commit -m "Description of your changes"
git push origin main
```

The site will automatically rebuild and redeploy (takes 2-3 minutes).

## 🧪 Test Locally Before Deploying

Always test your changes locally first:

```bash
npm run build
npm run start
```

Then open http://localhost:3000 to verify everything works.

## 📝 Configuration Details

The following files have been configured for GitHub Pages:

- **`next.config.ts`**: Configured for static export with basePath `/FEAA200`
- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for automatic deployment
- **`.nojekyll`**: Tells GitHub Pages not to use Jekyll processing

## ⚠️ Important Notes

1. **Images**: All images are configured as unoptimized for static export
2. **Base Path**: All routes include `/FEAA200` prefix when deployed
3. **Dynamic Routes**: Pre-rendered at build time using static generation
4. **Build Time**: First deployment may take 3-5 minutes

## 🐛 Troubleshooting

### Build Fails
- Check the Actions tab for error details
- Verify all dependencies are in `package.json`
- Test the build locally: `npm run build`

### 404 Errors
- Ensure `.nojekyll` file exists in the repository root
- Verify the basePath in `next.config.ts` matches your repository name

### Styles Not Loading
- Clear your browser cache
- Check the Actions deployment log for any errors

## 📚 Resources

- [Next.js Static Exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Need help?** Check the repository issues or contact your course instructor.

