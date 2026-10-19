rm -rf build || true
rm build.zip || true
yarn install
npm run bundle
cp .env build/.env
cd build
zip -r ../build.zip .
cd ../
