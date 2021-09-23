import React, { useState } from "react";

function TowelVariant({ towelNames, collection, productId }) {

    return (
        <div>
            {towelNames.map((towel) => (
                <p>{towel.name}</p>
            ))}
        </div>

    )
}

export default TowelVariant; 