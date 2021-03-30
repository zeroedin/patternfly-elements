const elements = [...document.querySelectorAll("pfe-readtime")];

suite("<pfe-readtime>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-readtime"),
            customElements.get("pfe-readtime"),
            "pfe-readtime should be an instance of pfeReadtime"
        );
    });

    // Write tests for each attribute
    test("word count attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

    // Write tests for each slot

});
