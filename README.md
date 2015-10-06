# SAPUI5/OpenUI5 collection

This is a collection of ui5 versions.

If you want to use it in your project, navigate to your project and run this command:

    git clone https://github.com/PlaceWorkersGmbH/ui5.git ./resources

If you want to use the latest stable version use a script-tag like this in your SAPUI5 project:

    <script src="/resources/latest/sap-ui-core.js"
        id="sap-ui-bootstrap"
        data-sap-ui-libs="sap.m"
        data-sap-ui-xx-bindingSyntax="complex"
        data-sap-ui-resourceroots='{"localtest": "./"}'
        data-sap-ui-theme="sap_bluecrystal">
    </script>

If you want to use an older version, use a script-tag like this:

    <script src="/resources/1.24.6/sap-ui-core.js"
    ...

## Add a new version

Copy the named folder into the repository and set new symlinks like this:

    cd 1.30.9/
    find !(resources) -delete
    mv -v ./resources/* ./
    rm -rf resources
    find . -type f -name "*-dbg.js" -delete

    cd ..
    ln -sf ./latest
    ln -sf ./1.30.9 ./latest

## Speed up the deploy process

To speed up the deploy process it can be usefull to remove unnecessary debug-files from the folders. On this way you can shrink the file size down to ~ 50% of the original size. Navigate to the concerned folder and use the following command: 

    find . -type f -name "*-dbg.js" -delete

---

Questions? Ask Nils (neumann@placeworkers.com).
