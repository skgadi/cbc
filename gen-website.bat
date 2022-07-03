rmdir /s/q .\docs
mkdir .\docs\
copy .\dev\*.png .\docs\
copy .\dev\*.js .\docs\
copy .\dev\manifest.json .\docs\
copy .\dev\CNAME .\docs\
copy .\dev\browserconfig.xml .\docs\
copy .\dev\index.min.html .\docs\index.html
xcopy .\dev\flags .\docs\flags /y/s/q/i
mkdir .\docs\css\
copy .\dev\css\*.min.css .\docs\css\



