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

Questions? Ask Nils (neumann@placeworkers.com).
